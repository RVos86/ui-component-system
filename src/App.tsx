import { Button } from '@/components';
import { Input } from '@/components';
import { Typography } from '@/components';
import { Search } from 'lucide-react';

export default function App() {
  return (
    <div className="p-6">
      <Typography variant="h1" className="text-blue-600">
        UI Component System
      </Typography>
      <Button>Click me</Button>
      <Input
        label="Let's look for a task!"
        icon={<Search />}
        placeholder="Search tasks..."
        error=""
      />
    </div>
  );
}
