import { Routes } from '@angular/router';
import { KanbanBoard } from './pages/kanban-board/kanban-board';

export const routes: Routes = [
    {path:'',component:KanbanBoard},
    {path:'**',redirectTo:''}
];
