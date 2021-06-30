import { db } from '../database';
import { isEmpty } from 'lodash';
import bcrypt from 'bcryptjs';

// To create a new service and check if service already exists
export const Create = async (req: any, res: any, next: any) => {
    const service= req.body.service;
    const password= req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    var collection = db.getCollection('serviceData');
    const data: any[] = collection.data;
    if(isEmpty(data)) {
        db.addCollection('serviceData').insert([
            {"service": service, "password": hashedPassword}
        ]);
        db.saveDatabase();
        return res.json({ message: "Service created." });
    } else {
        data.forEach(element => {
            if(element.service == service && bcrypt.compare(password, element.password)){
                return res.json({ message: "Service and password already exists." });
            }
            else { 
                db.addCollection('serviceData').insert([
                    {"service": service, "password": hashedPassword}
                ]);
                db.saveDatabase();
                return res.json({ message: "Service created." });
            }
        }); 
    }
};

// To read the service data and password from local db 
export const Read = async (req: any, res: any, next: any) => {
    const service= req.body.service;
    var collection = db.getCollection('serviceData');
    const data: any[] = collection.data;
    if(isEmpty(data)) {
        return res.json({ message: "No services available." });
    } else {
        data.forEach(element => {
            if(element.service == service){
                return res.json({
                    element
                });
            }
            else { 
                return res.json({ message: "No such service found !" });
            }
        });
    }
};

// To update the service data and password in local db 
export const Update = async (req: any, res: any, next: any) => {
    const service= req.body.service;
    const password= req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    var collection = db.getCollection('serviceData');
    const data: any[] = collection.data;
    if(isEmpty(data)) {
        return res.json({ message: "No services exists" });
    } else {
        data.forEach(element => {
            if(element.service == service){
                element.password = hashedPassword;
                db.saveDatabase();
                return res.json({ message: "Updated password" });
            }
            else { 
                return res.json({ message: "No such service exists" });
            }
        }); 
    }
};

// To delete the service data and password from local db 
export const Delete = async (req: any, res: any, next: any) => {
    const service= req.body.service;
    var collection = db.getCollection('serviceData');
    const data: any[] = collection.data;
    if(isEmpty(data)) {
        return res.json({ message: "No services available." });
    } else {
        data.forEach(element => {
            if(element.service == service){
                data.splice(element.service, 1);
                db.saveDatabase();
                return res.json({ message: "Deleted" });
            }
            else { 
                return res.json({ message: "No such service found !" });
            }
        });
    }
};