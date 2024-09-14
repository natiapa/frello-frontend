import { useEffect, useState } from 'react';
import { socketService } from "../services/socket.service";

import { userService } from "../services/user";

export function App() {
    useEffect(() => {
        const user = userService.getLoggedinUser(); // מקבלים את המשתמש המחובר

        if (user && user._id) {
            // שולחים את ה-userId לשרת כדי לעדכן את ה-Socket עם ה-userId
            socketService.emit('set-user-socket', user._id);
        }

        // שולחים בקשה לקבלת המשתמשים המחוברים
        socketService.emit('get-connected-users');

        // האזנה לאירוע קבלת המשתמשים המחוברים מהשרת
        socketService.on('connected-users', (userIds) => {
            console.log('Connected Users:', userIds); // הדפסת המשתמשים המחוברים ל-console
        });

        return () => {
            socketService.off('connected-users');
        };
    }, []);

    return (
        <div>
            <h1>Check the Console for Connected Users</h1>
        </div>
    );
}

