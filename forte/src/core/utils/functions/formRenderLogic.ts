export const getTabCount = (fields: any) => {
    let count = 0;
    fields?.forEach((field: any) => field.type === 'Sheet' ? count ++ : count);
    return count;
}

export const getTabs = (fields: any) => fields?.filter((field: any) => field.type === 'Sheet').sort((field1:any, field2:any) => field1.index - field2.index);

export const getFieldsByParent = (parent: string, fields: any) => {
    const tabs = getTabs(fields);
    const currentParent = parent || ((tabs?.length && tabs[0]?.name?.length) ? getTabs(fields)[0].name : '');
    return fields?.filter((field: any) => field.parent === currentParent).sort((field1:any, field2:any) => field1.index - field2.index);
}

export const getAllIndices = (fields: any) => new Set(fields?.map((field: any) => field.index));

export const getAllFieldsForIndices = (fields: any, index: number) => fields?.filter((field: any) => field.index === index);

export const convertToBase64 = (file: File) => {
    return new Promise ((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}