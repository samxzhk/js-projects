function ProgressBar()
{
       const values = this.createStructure();
       this.attachStructure(values);
      
       this.pgb = values[0];
       this.pgbValue = values[1];
       this.pgbFill = values[2];
       
}

ProgressBar.prototype = 
{
    count:0,
    constructor:ProgressBar,
    createStructure()
    {
        ProgressBar.prototype.count+=1;
         const pgbContainer = document.createElement('div');

        pgbContainer.classList.add('progress-bar');
        pgbContainer.setAttribute('id', 'pgb-' + ProgressBar.prototype.count);

        const pgbValueContainer = document.createElement('div');
        pgbValueContainer.classList.add('progress-bar__value');
        pgbValueContainer.textContent = '100%';

        const pgbFillContainer = document.createElement('div');
       

        pgbFillContainer.classList.add('progress-bar__fill');

        return [pgbContainer, pgbValueContainer, pgbFillContainer];
    },
    attachStructure(structure)
    {
        const body = document.body;
        const container = structure[0];
        container.appendChild(structure[1]);
        container.appendChild(structure[2]);
        body.appendChild(container);
        
    },
    adjustValue(value)
    {
        value = (value > 100 ? 100 : value < 0 ? 0 : value);
        return value;
    },
    updatePercentage(value)
    {
       //  this.pgbFill
       //this.pgbValue
       value = this.adjustValue(value) + '%';
        this.pgbFill.style.width = value;
        this.pgbValue.innerText = value;
     
    }
}



const pgb = new ProgressBar()

function generateRandons()
{
    const pgbsArr = [];
    for(let i = 0; i < 8; i++)
    {
        pgbsArr.push(new ProgressBar());
    }

    return pgbsArr;

}

const pgbsArr = generateRandons();

 setInterval(function()
{
    let randomPgb = pgbsArr[Math.floor(Math.random() * pgbsArr.length)];
    let randomValue = Math.floor(Math.random()*101);
    randomPgb.updatePercentage(randomValue);
}, 1000);