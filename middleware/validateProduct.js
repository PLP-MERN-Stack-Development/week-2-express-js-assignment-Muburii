module.exports = function (req, res, next) {
  const { id, name, description, price, category, inStock } = req.body;
  if (
    typeof id !== 'number' ||
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ message: 'Invalid product data' });
  }
  next();
};