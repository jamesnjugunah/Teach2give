//1. Check if a String is a Palindrome
//Write a function to determine if a given string is a palindrome. A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).
function isPalindrome(str) {
    let reg = /[\W_]/g;
    let smallStr = str.toLowerCase().replace(reg, "");
    let reversed = smallStr.split("").reverse().join("");
    return reversed === smallStr;
}
 

//2. Reverse a String
//Write a function to reverse a given string.
function reverseString(str) {
    return str.split("").reverse().join("");
}

// 3. Find the Longest Palindromic Substring
//Write a function to find the longest palindromic substring in a given string.
function longestPalindrome(str) {
    let longest = "";
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            let substring = str.slice(i, j);
            if (isPalindrome(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    return longest;
}
 

//4. Check if Two Strings are Anagrams
//Write a function to check if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency but in different orders.
function isAnagram(str1, str2) {
    let sorted1 = str1.split("").sort().join("");
    let sorted2 = str2.split("").sort().join("");
    return sorted1 === sorted2;
}
 
//5. Remove Duplicates from a String
//Write a function to remove duplicate characters from a string while preserving the order of the first appearance of each character.
function removeDuplicates(str) {
    let unique = "";
    for (let char of str) {
        if (!unique.includes(char)) {
            unique += char;
        }
    }
    return unique;
}
 

//6. Count Palindromes in a String
//Write a function to count how many distinct palindromes are in a given string. A palindrome is considered distinct based on its start and end position in the string.
function countPalindromes(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            let substring = str.slice(i, j);
            if (isPalindrome(substring)) {
                count++;
            }
        }
    }
    return count;
}
 

//7. Longest Common Prefix
//Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.
function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
        }
    }
    return prefix;
}
 

//8. Case Insensitive Palindrome
//Modify the palindrome function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.
function isPalindrome(str) {
    let reg = /[\W_]/g;
    let smallStr = str.toLowerCase().replace(reg, "");
    let reversed = smallStr.split("").reverse().join("");
    return reversed === smallStr;
}
 
