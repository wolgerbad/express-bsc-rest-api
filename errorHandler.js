export default function errorHandler(err, req, res, next) {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(404).json({ message: 'Something went wrong!' });
}
