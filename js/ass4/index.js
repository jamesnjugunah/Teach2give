//1. Check if a String is a Palindrome
//Write a function to determine if a given string is a palindrome. A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).
function isPalindrome(str) {
  // remove non-alphanumeric characters
  str = str.replace(/[^A-Za-z0-9]/g, '');
  // convert to lowercase
  str = str.toLowerCase();
  // compare with reverse
  return str === str.split('').reverse().join('');
}
console.log(isPalindrome("was it a car or a cat I saw?")); 
 

//2. Reverse a String
//Write a function to reverse a given string.
function reverseString(str){
    str = str.split('').reverse().join('');
    return str;
}

console.log(reverseString('hello')); // olleh

 //3. Find the Longest Palindromic Substring
//Write a function to find the longest palindromic substring in a given string.
function longestPalidrome(str){
    let longest = '';
    for(let i = 0; i < str.length; i++){
        for(let j = i + 1; j <= str.length; j++){
        let subStr = str.slice(i, j);
        if(isPalindrome(subStr) && subStr.length > longest.length){
            longest = subStr;
        }
        }
    }
    return longest;


}
console.log(longestPalidrome('babad')); // bab
 

//4. Check if Two Strings are Anagrams
//Write a function to check if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency but in different orders.
function areAnagrams(str1, str2){
    str1 = str1.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    str2 = str2.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    return str1.split('').sort().join('') === str2.split('').sort().join('');
}
console.log(areAnagrams('listen', 'silent')); // true
 
//5. Remove Duplicates from a String
//Write a function to remove duplicate characters from a string while preserving the order of the first appearance of each character.
function removeDuplicates(str){
    let result = '';
    for(let i = 0; i < str.length; i++){
        if(result.indexOf(str[i]) < 0){
            result += str[i];
        }
    }
    return result;
}
console.log(removeDuplicates('hello world')); // helo
 

//6. Count Palindromes in a String
//Write a function to count how many distinct palindromes are in a given string. A palindrome is considered distinct based on its start and end position in the string.
function distinctPalidromes(str){
    let count = 0;
    for(let i = 0; i < str.length; i++){
        for(let j = i + 1; j <= str.length; j++){
            let subStr = str.slice(i, j);
            if(isPalindrome(subStr)){
                count++;
            }
        }
    }
    return count;
}
console.log(distinctPalidromes('ababa')); //14
 

//7. Longest Common Prefix
//Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.
function longestCommonPrefix(strs){
    if(strs.length === 0){
        return '';
    }
    let prefix = strs[0];
    for(let i = 1; i < strs.length; i++){
        while(strs[i].indexOf(prefix) !== 0){
            prefix = prefix.substring(0, prefix.length - 1);
        }
    }
    return prefix;
}
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // fl
 

//8. Case Insensitive Palindrome
//Modify the palindrome function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.
function isCaseInsensitivePalindrome(str){
    str = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    return str === str.split('').reverse().join('');
}
console.log(isCaseInsensitivePalindrome("Was it a car or a cat I saw?")); // true
 
