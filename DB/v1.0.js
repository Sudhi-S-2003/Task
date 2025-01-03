// DB/v1.0.js
import fs from "fs/promises"; // Use the Promise-based API for fs
import path from "path";

const DB_FOLDER = process.env.DB_FOLDER || path.join(process.cwd(), ".DB_STORE");
const SCHEMA_FOLDER = path.join(DB_FOLDER, "schemas");

// Ensure that the folder exists or create it
const ensureFolderExists = async (folderPath) => {
    try {
        await fs.mkdir(folderPath, { recursive: true });
    } catch (error) {
        console.error(`Error ensuring folder exists: ${error.message}`);
        throw error;
    }
};

// Read a file and parse it as JSON
const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data ? JSON.parse(data) : []; // Return empty array if data is empty
    } catch (error) {
        if (error.code === "ENOENT") return []; // File not found, return empty array
        console.error(`Error reading file: ${filePath}`, error);
        throw error;
    }
};

// Write data to a file, stringify as JSON with indentation
const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 4));
    } catch (error) {
        console.error(`Error writing to file: ${filePath}`, error);
        throw error;
    }
};

// Validate the instance data against the schema
const validateInstance = (instance, schema) => {
    const errors = [];
    const processedData = {};

    for (const key in schema) {
        if (!instance.hasOwnProperty(key)) {
            errors.push(`Missing key: ${key}`);
        } else if (typeof instance[key] !== schema[key]) {
            errors.push(`Type mismatch for key: ${key}. Expected ${schema[key]}, got ${typeof instance[key]}`);
        } else {
            processedData[key] = instance[key];
        }
    }

    return { processedData, errors };
};

// Schema Management
export const createSchema = async (dbName, schema) => {
    const schemaPath = path.join(SCHEMA_FOLDER, `${dbName}_schema.json`);
    await ensureFolderExists(SCHEMA_FOLDER);
    await writeFile(schemaPath, schema);
};

export const fetchSchema = async (dbName) => {
    const schemaPath = path.join(SCHEMA_FOLDER, `${dbName}_schema.json`);
    return await readFile(schemaPath);
};

export const updateSchema = async (dbName, newSchema) => {
    const schemaPath = path.join(SCHEMA_FOLDER, `${dbName}_schema.json`);
    await writeFile(schemaPath, newSchema);
};

// Database Management
export const createDb = async (dbName, schema) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    await ensureFolderExists(DB_FOLDER);

    // Check if the database file exists, if not, create an empty file
    try {
        await fs.stat(filePath);
    } catch {
        await writeFile(filePath, []);
    }

    if (schema) {
        await createSchema(dbName, schema);
    }
};

export const deleteDb = async (dbName) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    const schemaPath = path.join(SCHEMA_FOLDER, `${dbName}_schema.json`);
    try {
        await fs.unlink(filePath); // Delete the database file
    } catch (error) {
        if (error.code !== "ENOENT") throw error; // Ignore ENOENT error (file not found)
    }
    try {
        await fs.unlink(schemaPath); // Delete the schema file
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
    }
};

export const listDatabases = async () => {
    const files = await fs.readdir(DB_FOLDER);
    return files.filter((file) => file.endsWith(".json")).map((file) => path.basename(file, ".json"));
};

// CRUD Operations
export const addInstance = async (dbName, instance) => {
    const schema = await fetchSchema(dbName);
    const { processedData, errors } = validateInstance(instance, schema);

    if (errors.length > 0) {
        return Promise.reject(new Error(`Validation errors: ${errors.join(", ")}`));
    }

    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    const data = await readFile(filePath);
    const newInstance = { id: data.length + 1, ...processedData }; // Ensure IDs are auto-generated
    data.push(newInstance);
    await writeFile(filePath, data);
    return newInstance;
};

export const fetchAll = async (dbName) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    return await readFile(filePath); // Return data (empty array if no file)
};

export const fetchInstanceById = async (dbName, id) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    const data = await readFile(filePath);
    return data.find((item) => item.id === id) || null;
};

export const updateInstanceById = async (dbName, id, updatedData) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    const data = await readFile(filePath);
    const instanceIndex = data.findIndex((item) => item.id === id);

    if (instanceIndex === -1) {
        throw new Error(`Instance with ID ${id} not found.`);
    }

    data[instanceIndex] = { ...data[instanceIndex], ...updatedData };
    await writeFile(filePath, data);
    return data[instanceIndex];
};

export const deleteInstanceById = async (dbName, id) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    const data = await readFile(filePath);
    const newData = data.filter((item) => item.id !== id);
    await writeFile(filePath, newData);
    return id;
};
