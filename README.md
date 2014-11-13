DeskSpace
=========
A website where employees can login and select a desk preference. An admin can then login and see what is the most popular desk in order to make adminstrative decisions. A chart displays what percentage of employees chose that specific desk as well as the cost of transferring all employees to that desk choice.
1. Clone repo
2. Navigate to root folder and run the following commands:

    bundle install
    rake db:create db:migrate db:seed
    rails s
