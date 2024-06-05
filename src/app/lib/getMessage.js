import messages from '../lib/messages.json';

export function getMessageById(id) {
    return messages[id] || { message: 'Mensaje no encontrado', type: 'error' };
  }
