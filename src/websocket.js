import WebSocket from 'ws';
import logger from './utils/logger.js';

export function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        logger.info('New WebSocket connection established');

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                handleWebSocketMessage(ws, data);
            } catch (error) {
                logger.error('WebSocket message handling error:', error);
            }
        });

        ws.on('close', () => {
            logger.info('Client disconnected');
        });
    });

    return wss;
}

function handleWebSocketMessage(ws, data) {
    switch (data.type) {
        case 'FUNNEL_UPDATE':
            broadcastFunnelUpdate(ws, data.payload);
            break;
        case 'ANALYTICS_UPDATE':
            broadcastAnalyticsUpdate(ws, data.payload);
            break;
        default:
            logger.warn('Unknown WebSocket message type:', data.type);
    }
}

function broadcastFunnelUpdate(ws, payload) {
    ws.send(JSON.stringify({
        type: 'FUNNEL_UPDATE',
        payload
    }));
}

function broadcastAnalyticsUpdate(ws, payload) {
    ws.send(JSON.stringify({
        type: 'ANALYTICS_UPDATE',
        payload
    }));
}
