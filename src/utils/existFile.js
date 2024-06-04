import fs from "fs";

export const ensureFileExistsRoommate = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '{"roommates":[]}');
            console.log('File created successfully');
        } else {
            console.log('File already exists');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error creating file');
    }
};

export const ensureFileExistsGastos = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '{"gastos":[]}');
            console.log('File created successfully');
        } else {
            console.log('File already exists');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error creating file');
    }
};