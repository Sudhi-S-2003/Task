import fs from "fs";
import path from "path";

const DB_FOLDER = process.env.DB_FOLDER || path.join(process.cwd(), "DB_STORE");

if (!fs.existsSync(DB_FOLDER)) {
    fs.mkdirSync(DB_FOLDER);
}

const readFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    return [];
};

const writeFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

export const createDb = (name = "example") => {
    const filePath = path.join(DB_FOLDER, `${name}.json`);
    if (!fs.existsSync(filePath)) {
        writeFile(filePath, []);
    }
};

export const addInstance = (dbName, instance) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Database ${dbName}.json does not exist.`);
    }
    const data = readFile(filePath);
    const newInstance = { id: data.length + 1, ...instance };
    data.push(newInstance);
    writeFile(filePath, data);
    return newInstance;
};


export const updateInstanceById = (dbName, id, updatedData) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    const data = readFile(filePath);
    const instanceIndex = data.findIndex((item) => item.id === id);

    if (instanceIndex === -1) {
        throw new Error(`Instance with ID ${id} not found.`);
    }

    data[instanceIndex] = { ...data[instanceIndex], ...updatedData };
    writeFile(filePath, data);
    return data[instanceIndex];
};

export const deleteDb = (dbName) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

export const deleteInstanceById = (dbName, id) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    const data = readFile(filePath);
    const newData = data.filter((item) => item.id !== id);
    writeFile(filePath, newData);
    return id;
};

export const fetchAll = (dbName) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    return readFile(filePath);
};

export const fetchInstanceById = (dbName, id) => {
    const filePath = path.join(DB_FOLDER, `${dbName}.json`);
    const data = readFile(filePath);
    return data.find((item) => item.id === id) || null;
};
