import React from 'react';
import { AudioRead } from './AudioRead';
import { LiveRelationshipMap } from './LiveRelationshipMap';
import { TimelinePreview } from './TimelinePreview';
import { AI_Launcher } from './AI_Launcher';

const DashboardShell = () => {
    return (
        <div className="dashboard-shell">
            <header>
                <AudioRead />
            </header>
            <main>
                <LiveRelationshipMap />
            </main>
            <aside>
                <AI_Launcher />
            </aside>
            <footer>
                <TimelinePreview />
            </footer>
        </div>
    );
};

export default DashboardShell;
