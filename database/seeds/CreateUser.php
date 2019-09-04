<?php

use Illuminate\Database\Seeder;
use App\User;

class CreateUser extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $Admin = new User();
      $Admin -> name = 'Admin Prosystem';
      $Admin -> email = 'admin@prosystem.mx';
      $Admin -> password = bcrypt('1234567890');
      $Admin -> saveOrFail();
    }
}
