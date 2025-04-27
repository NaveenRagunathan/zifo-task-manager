import MetricCard from "@/components/dashboard/MetricCard";
import ProgressChart from "@/components/dashboard/ProgressChart";
import TaskProgressBar from "@/components/dashboard/TaskProgressBar";
import TaskStatCard from "@/components/dashboard/TaskStatCard";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { TaskForm } from "@/components/tasks/TaskForm";
import TasksList from "@/components/tasks/TasksList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTasks } from "@/hooks/useTasks";
import { useTaskStats } from "@/hooks/useTaskStats";
import {
    Layers,
    MessageSquare,
    Plus
} from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { tasks } = useTasks();
  const { taskStats, isLoading: statsLoading } = useTaskStats();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tasks Dashboard</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <TaskForm onSuccess={() => setIsCreateDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TaskStatCard 
              title="Backlog" 
              count={statsLoading ? 0 : taskStats.backlog}
              type="backlog" 
            />
            <TaskStatCard 
              title="In Progress" 
              count={statsLoading ? 0 : taskStats["in-progress"]}
              type="progress" 
            />
            <TaskStatCard 
              title="Validation" 
              count={statsLoading ? 0 : taskStats.validation}
              type="validation" 
            />
            <TaskStatCard 
              title="Completed" 
              count={statsLoading ? 0 : taskStats.done}
              type="done" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TaskProgressBar />
            </div>
            <div>
              <MetricCard 
                title="Total Tasks" 
                value={statsLoading ? 0 : taskStats.total}
                icon={<Layers size={18} />} 
              />
              <div className="h-4" />
              <MetricCard 
                title="Comments" 
                value={0} 
                icon={<MessageSquare size={18} />} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <ProgressChart />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <TasksList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
