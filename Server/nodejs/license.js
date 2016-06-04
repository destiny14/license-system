var NodeRSA = require('node-rsa');

var licensee = { surname: '', name: '', licenseType: '' }

exports.licensee = licensee;
exports.paymentSucceeded = false;
exports.createLicense = function(){
	console.log("-> LICENSE SYSTEM: Creating license for licensee " + licensee);

	// Private Key laden. Der Key sollte im PEM Format vorliegen und kann auch direkt aus einer Datei geladen werden.
	var key = new NodeRSA('-----BEGIN PRIVATE KEY-----\n' +
						'MIICcgIBADANBgkqhkiG9w0BAQEFAASCAlwwggJYAgEAAoGA8CKn78RI6h7vNOPMeMCeRCHegEgG\n' +
						'1nR+X84B8b3sOZF6hAjDXF80ag1Zw1T0E+NVHmbPB8aLgRPmQPA351ZR8D+BCHooDlGqstLLHiqT\n' +
						'u9bbqRVPti46XBeju3Fbi47euO+omH0sq7LCuIZ5s1WBmTc9ejkkfc/0rk3fAYaIRuECAwEAAQKB\n' +
						'gOmEmhEUrN9XU8D4IVfv4DhbQ1c2M8gKovYhjEx8J6LX8O9C4lAKmRrkfrzv+Sb59EVLLtrd3b2Z\n' +
						'D1lpAMQrciMwC5PAa8da/J++lR1VjM5GbzqKjGtfx3WQlzNE1ZaZ2FSY8lAPMM4uLczyD79PJQBs\n' +
						'GCcx3KDJRR5ENp6an5cRAkD+bUUSqiX8oqHE7IawrgZW5qewFeGsCCnAyVgtP68XSDLWPNhAM01B\n' +
						'fN5AVgfqBljrpFNgWXck80vwpcvKHAMtAkDxnsOsZCwaGIuCDvSPjT/4CB80okHhJdjsWbIGYs9G\n' +
						'IeRPZ3cDK/O401/+GQcDZQwtBPjF7CaTEr0xTacOK3MFAkC5FU5JLKOjq79YnOPChWYxM2vLKa/Y\n' +
						'ULvm9dGCYTCDFE9/EBYUZf2OZULctHjfYqyvBwRsM8j7hU26CzI7nbMlAkAAkVjwXMPlw80AHzzf\n' +
						'4XsXAB3ip8bz2nzqAUPz0+OczJOWxC15am8GLij5leF4VpJywKI9BNMKYW7kYMRVujBpAkDuBDww\n' +
						'aqOOsIB87OusL1m5V0ZF8SNQR0cyqIX6Oztc0G+dPmUHOdQ53561roIajtLmGNTsPcITOZUZB/FS\n' +
						'xFnX\n'+
						'-----END PRIVATE KEY-----', {signingScheme: 'sha1'});

	// Namen und Lizenztyp zusammenfassen und signieren
	var licenseeString = licensee.surname + licensee.name + licensee.licenseType;
	licenseeString = licenseeString.toUpperCase();
	var signature = key.sign(licenseeString, 'hex');

	var formattedSignature = signature.match(/.{1,29}/g).join('\n');

	// Ausgabe formatieren
	var outputLicense = "--------BEGIN LICENSE--------\n" +
						licensee.surname + " " + licensee.name + "\n" +
						licensee.licenseType + "\n" +
						formattedSignature + "\n" +
						"---------END LICENSE---------";

	return outputLicense;
}