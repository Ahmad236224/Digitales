-- Enable row level security so public."Lead" is not exposed through PostgREST.
ALTER TABLE public."Lead" ENABLE ROW LEVEL SECURITY;
