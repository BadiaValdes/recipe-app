

export interface DeleteMessageTemplate {
    name: string,
    title: string,
    description: string,
    actionButton: string,
}

export const defaultDeleteMessage : DeleteMessageTemplate = {
    name: 'delete',
    title: 'Eliminar',
    description: 'Seguro que desea eliminar el elemento?',
    actionButton: 'Delete',
}