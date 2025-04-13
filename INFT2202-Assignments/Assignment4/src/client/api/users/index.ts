"use strict";

import { User } from '../../user.js';

interface ContactData {
    id: string;
    displayName: string;
    emailAddress: string;
    username: string;
    password: string;
}

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error("Could not fetch users.");
    return response.json();
}

export async function fetchUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error("Could not fetch user.");
    return response.json();
}

export async function createUser(user: ContactData): Promise<User> {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Could not create user.");
    const data = await response.json();
    return new User(data.id, data.displayName, data.emailAddress, data.username, data.password);
}

export async function updateUser(id: string, user: ContactData): Promise<User> {
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Could not update user.");
    const data = await response.json();
    return new User(data.id, data.displayName, data.emailAddress, data.username, data.password);
}

export async function deleteUser(id: string): Promise<void> {
    const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error("Could not delete user.");
}
