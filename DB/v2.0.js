// DB/v2.0.js
import fs from "fs/promises"; // Use the Promise-based API for fs
import path from "path";

const DB_FOLDER = process.env.DB_FOLDER || path.join(process.cwd(), ".DB_STORE");
const SCHEMA_FOLDER = path.join(DB_FOLDER, "schemas");

const ensureFolderExists = async (folderPath) => {
    try {
        await fs.mkdir(folderPath, { recursive: true });
    } catch (error) {
        console.error(`Error ensuring folder exists: ${error.message}`);
        throw error;
    }
};

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        if (error.code === "ENOENT") return [];
        console.error(`Error reading file: ${filePath}`, error);
        throw error;
    }
};

const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 4));
    } catch (error) {
        console.error(`Error writing to file: ${filePath}`, error);
        throw error;
    }
};

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

class Database {
    constructor(dbName) {
        this.dbName = dbName;
        this.dbPath = path.join(DB_FOLDER, `${dbName}.json`);
        this.schemaPath = path.join(SCHEMA_FOLDER, `${dbName}_schema.json`);
    }

    // Ensure the folder exists and initialize schema
    async init(schema) {
        await ensureFolderExists(DB_FOLDER);
        await ensureFolderExists(SCHEMA_FOLDER);

        // Initialize DB file if it doesn't exist
        try {
            await fs.stat(this.dbPath);
        } catch {
            await writeFile(this.dbPath, []);
        }

        if (schema) {
            await this.createSchema(schema);
        }
    }

    // Create schema for the database
    async createSchema(schema) {
        await writeFile(this.schemaPath, schema);
    }

    // Fetch schema for the database
    async fetchSchema() {
        return await readFile(this.schemaPath);
    }

    // Add instance (create a new record)
    async addInstance(instance) {
        const schema = await this.fetchSchema();
        const { processedData, errors } = validateInstance(instance, schema);

        if (errors.length > 0) {
            return Promise.reject(new Error(`Validation errors: ${errors.join(", ")}`));
        }

        const data = await readFile(this.dbPath);
        const newInstance = { id: data.length + 1, ...processedData }; // Auto-generate ID
        data.push(newInstance);
        await writeFile(this.dbPath, data);
        return newInstance;
    }

    // Fetch all instances (records)
    async fetchAll() {
        return await readFile(this.dbPath);
    }

    // Fetch instance by ID
    async fetchInstanceById(id) {
        const data = await readFile(this.dbPath);
        return data.find((item) => item.id === id) || null;
    }

    // Update an instance by ID
    async updateInstanceById(id, updatedData) {
        const data = await readFile(this.dbPath);
        const instanceIndex = data.findIndex((item) => item.id === id);

        if (instanceIndex === -1) {
            throw new Error(`Instance with ID ${id} not found.`);
        }

        data[instanceIndex] = { ...data[instanceIndex], ...updatedData };
        await writeFile(this.dbPath, data);
        return data[instanceIndex];
    }

    // Delete an instance by ID
    async deleteInstanceById(id) {
        const data = await readFile(this.dbPath);
        const newData = data.filter((item) => item.id !== id);
        await writeFile(this.dbPath, newData);
        return id;
    }
}

export default Database;
