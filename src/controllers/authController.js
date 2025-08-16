const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User exists' });
  const user = new User({ email, password, role: 'admin' });
  await user.save();
  res.json({ message: 'Admin created', data: user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  // res.cookie("token", token, '1h')
  // res.status({ token , user});
  res.status(200).json({success: true, user, token})
};