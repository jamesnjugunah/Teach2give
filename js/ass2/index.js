//JavaScript String Practice Questions
//1. Check String Input
//○ Write a JavaScript function to check whether an 'input' is a string or not.
function is_string(input) {
    if (typeof input === 'string') {
        return true;
    } else {
        return false;
    }
}
//Test Data:
console.log(is_string('w3resource')); // true
console.log(is_string([1, 2, 4, 0])); // false

//2. Check Blank String
//Write a JavaScript function to check whether a string is blank or not.
function is_Blank(input) {
    if (input.length === 0) {
        return true;
    } else {
        return false;
    }
}

//Test Data:
console.log(is_Blank('')); // true
console.log(is_Blank('abc')); // false


//3. String to Array of Words
//Write a JavaScript function to split a string and convert it into an array of words.
function string_to_array(input) {
    return input.trim().split(" ");

}

//Test Data:

console.log(string_to_array("Robin Singh")); // ["Robin", "Singh"]

//4. Extract Characters
//Write a JavaScript function to extract a specified number of characters from a
function truncate_string(input, n) {
    return input.substring(0, n);
}

//string.
//Test Data:
console.log(truncate_string("Robin Singh", 4)); // "Robi"

//5. Abbreviate Name
//Write a JavaScript function to convert a string into abbreviated form.
function abbrev_name(input) {
    let name = input.split(" ");
    return name[0] + " " + name[1].charAt(0) + ".";
}


//○ Test Data:
console.log(abbrev_name("Robin Singh")); // "Robin S."

//6. Hide Email Address
//○ Write a JavaScript function that hides email addresses to prevent unauthorized access.
function protect_email(email) {
    let split = email.split("@");
    let first = split[0];
    let second = split[1];
    let firstHalf = first.slice(0, 5);
    let secondHalf = first.slice(5);
    return firstHalf + "..." + "@" + second;
}
//○ Test Data:
console.log(protect_email("robin_singh@example.com")); //
"robin...@example.com"

//7. Parameterize String
//○ Write a JavaScript function to parameterize a string.
function string_parameterize(input) {
    return input.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, "").replace(/\s/g, "-");
}

//○ Test Data:
console.log(string_parameterize("Robin Singh from USA.")); //"robin-singh-from-usa"

//8. Capitalize First Letter
//○ Write a JavaScript function to capitalize the first letter of a string.
function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

//○ Test Data:
console.log(capitalize('js string exercises')); // "Js string exercises"

//9. Capitalize Each Word
//○ Write a JavaScript function to capitalize the first letter of each word in a string.
function capitalize_Words(input) {
    return input.replace(/\b[a-z]/g, function (char) {
        return char.toUpperCase();
    });
}

//○ Test Data:
console.log(capitalize_Words('js string exercises')); // "Js String Exercises"

//10. Swap Case
//○ Write a JavaScript function that converts uppercase letters to lowercase and vice versaversa.
function swapcase(input) {
    return input.replace(/([a-z]+)|([A-Z]+)/g, function (match, chr) {
        return chr ? match.toUpperCase() : match.toLowerCase();
    });
}

//○ Test Data:
console.log(swapcase('AaBbc')); // "aAbBC"


//11. Camelize String
//○ Write a JavaScript function to convert a string into camel case.
function camelize(input) {
    return input.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
}

//○ Test Data:
console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"

//12. Uncamelize String
//○ Write a JavaScript function to uncamelize a string.
function uncamelize(input, separator) {
    separator = typeof separator === 'undefined' ? '_' : separator;
    return input.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').toLowerCase();
}

//Test Data:
console.log(uncamelize('helloWorld')); // "hello world"
console.log(uncamelize('helloWorld','-')); // "hello-world"

//13. Repeat String
//Write a JavaScript function to concatenate a given string n times.
function repeat(input, n) {
    if (n === 1) {
        return input;
    } else {
        return input + repeat(input, n - 1);
    }
}

//○ Test Data:
console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"

//14. Insert in String
//○ Write a JavaScript function to insert a string within another string at a given position.
function insert(main_string, ins_string, pos) {
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}



//Test Data:
console.log(insert('We are doing some exercises.', 'JavaScript ', 18));// "We are doing some JavaScript exercises."

//15. Humanize Format
//Write a JavaScript function that formats a number with the correct suffix (1st,2nd, etc.).
function humanize_format(n) {
    if (typeof n === 'undefined') {
        return;
    }
    if (n % 100 >= 11 && n % 100 <= 13) {
        return n + "th";
    }
    switch (n % 10) {
        case 1:
            return n + "st";
        case 2:
            return n + "nd";
        case 3:
            return n + "rd";
    }
    return n + "th";
}

//○ Test Data:
console.log(humanize_format(301)); // "301st"

//16. Truncate String with Ellipsis
//Write a JavaScript function to truncate a string and append "...".
function text_truncate(input, n, add) {
    if (input.length <= n) {
        return input;
    }
    return input.slice(0, n) + add;
}

//Test Data:
console.log(text_truncate('We are doing JS string exercises.', 15, '!!'));// "We are doing !!"

//17. Chop String into Chunks
//Write a JavaScript function to chop a string into chunks.
function string_chop(input, size) {
    let result = [];
    for (let i = 0; i < input.length; i += size) {
        result.push(input.slice(i, i + size));
    }
    return result;
}

//○ Test Data:
console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]

//18. Count Substring Occurrences
//○ Write a JavaScript function to count occurrences of a substring in a string.
function count(main_str, sub_str) {
    main_str += '';
    sub_str += '';
    let substring;
    if (sub_str.length <= 0) {
        return main_str.length + 1;
    }
    substring = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return (main_str.match(new RegExp(substring, 'gi')) || []).length;
}

//Test Data:
console.log(count("The quick brown fox jumps over the lazy dog", 'the'));// Output: 2

//19. Reverse Binary Representation
//Write a JavaScript function that reverses the binary representation of a number
function reverse_binary(n) {
    return parseInt(n.toString(2).split("").reverse().join(""), 2);
}
//and returns its decimal form.

//Test Data:
console.log(reverse_binary(100)); // 19

//20. Pad String to Length
//Write a JavaScript function to pad a string to a specified length.
function lpad(input, length, pad) {
    let str = input + '';
    while (str.length < length) {
        str = pad + str;
    }
    return str;
}


//Test Data:
console.log(lpad('0000', 123, 'l')); // "0123"