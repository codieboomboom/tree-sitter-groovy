// groovy -cp $HOME/.m2/repository/com/h2database/h2/1.3.166/h2-1.3.166.jar groovySql

// http://groovy.codehaus.org/Tutorial+6+-+Groovy+SQL

// Grab will not load the driver! but at least we can trigger it to download it and then use groovy -cp option to run this script.
// @Grab('com.h2database:h2:1.3.166')

import groovy.sql.Sql
sql = Sql.newInstance(
	'jdbc:h2:~/test', 
	'sa',
	'', 
	'org.h2.Driver')
sql.eachRow('select * from USER') { 
	println "${it.id}, ${it.firstName}"
}
