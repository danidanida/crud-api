import { User } from '../../types/user.interface';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [
    { id: '58c31534-6aa9-4f48-b14c-68d850a1babc', username: 'User1', age: 21, hobbies: ['Swimming', 'Hiking'] },
    { id: 'a64b38d2-9146-40dc-a346-619225d6d8e1', username: 'User2', age: 22, hobbies: ['Reading', 'Gaming'] },
    { id: '002178b0-5f96-48ff-b7ec-9157aa6e4047', username: 'User3', age: 23, hobbies: ['Swimming', 'Hiking'] },
    { id: '9959016d-b23a-4929-84f0-5dd8977aa29c', username: 'User4', age: 24, hobbies: ['Reading', 'Gaming'] },
    { id: 'bd81bb7a-196a-47f5-8880-64546c73369f', username: 'User5', age: 25, hobbies: ['Swimming', 'Hiking'] },
    { id: '80cd4bdd-66f4-47fe-8a6d-8b349dc335e1', username: 'User6', age: 26, hobbies: ['Reading', 'Gaming'] },
    { id: '3161b654-d9b9-4563-8970-a962197002ec', username: 'User7', age: 27, hobbies: ['Swimming', 'Hiking'] },
    { id: 'cde4eeb9-52ef-49f4-8fe4-3cdecf356aa5', username: 'User8', age: 28, hobbies: ['Reading', 'Gaming'] },
    { id: '0dd5fed1-7bf3-4b62-9985-fd4070fa19db', username: 'User9', age: 29, hobbies: ['Swimming', 'Hiking'] },
    { id: '60df2179-164e-4ede-94da-3a476ba74eb4', username: 'User10', age: 30, hobbies: ['Reading', 'Gaming'] }
  ];
export const findAll = (): User[] => users;

export const find = (id: string): User | undefined => users.find(user => user.id === id);

export const create = (newUser: Omit<User, 'id'>): User => {
    const user = { id: uuidv4(), ...newUser };
    users.push(user);
    return user;
};