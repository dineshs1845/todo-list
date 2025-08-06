// Database Setup Instructions for Supabase
// 
// You need to create a 'tasks' table in your Supabase database.
// Go to your Supabase dashboard -> SQL Editor and run this SQL:

export const createTasksTableSQL = `
-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for development)
-- You might want to restrict this based on user authentication later
CREATE POLICY "Allow all operations on tasks" ON public.tasks
    FOR ALL USING (true) WITH CHECK (true);

-- Grant permissions
GRANT ALL ON public.tasks TO anon;
GRANT ALL ON public.tasks TO authenticated;
GRANT ALL ON SEQUENCE public.tasks_id_seq TO anon;
GRANT ALL ON SEQUENCE public.tasks_id_seq TO authenticated;
`;

// Alternative: If you want user-specific tasks, use this policy instead:
export const userSpecificTasksSQL = `
-- Create policy for user-specific tasks (requires authentication)
CREATE POLICY "Users can only see their own tasks" ON public.tasks
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- You would also need to add a user_id column:
ALTER TABLE public.tasks ADD COLUMN user_id UUID REFERENCES auth.users(id);
`;

console.log('To set up your database, copy and paste this SQL into your Supabase SQL Editor:');
console.log(createTasksTableSQL);