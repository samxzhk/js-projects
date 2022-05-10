const container = document.querySelector('.container');
const input = document.getElementById('input');
const btn = document.getElementById('btn');
const output = document.getElementById('output');

function calculateLength()
{
    const value = input.value.trim().length;
    output.innerText = value;
    

}
btn.addEventListener('click', calculateLength);