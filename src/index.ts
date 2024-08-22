import app from './app';

const port: number = parseInt(process.env.PORT || '3000', 10);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});