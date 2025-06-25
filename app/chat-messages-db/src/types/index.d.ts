// This file defines TypeScript types and interfaces for chat messages and user data structures.

export interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: Date;
}

export interface User {
    id: string;
    email: string;
    senha?: string;
    nome: string;
    tipo: string;
    imagem?: string;
}