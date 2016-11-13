<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('users')->delete();

        $users = array(
        	['name' => 'Riki Sholiardi', 'email' => 'riki.wtu@wavin.co.id', 'password' => Hash::make('secret')],
        	['name' => 'Alparisyi', 'email' => 'faris.wtu@wavin.co.id', 'password' => Hash::make('secret')],
        	['name' => 'Udin Khouiruddin', 'email' => 'nasrudin.wtu@wavin.co.id', 'password' => Hash::make('secret')],
        );

        //loop through each user above and create the record for them in the database
		foreach ($users as $user) {
		    User::create($user);
		}

		Model::reguard();
    }
}
