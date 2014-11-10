# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Desk.create(style: "basic", price: 50, description: "Perfect for coloring spreadsheets, Easy to assemble, 35.63 x 23.5 x 24")
Desk.create(style: "standing", price: 300, description: "No more being hunched over, Adjustable height, 59 x 28.5 x 33.5-45.25")
Desk.create(style: "mega", price: 2000, description: "Large touchscreen for debugging, For Developers only, 60 x 30 x 30")
