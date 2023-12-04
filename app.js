console.log('Starting game...');

let bitcoin = 0;

let clickUpgrades = {
    dogecoinMiner: {
        name: 'Dogecoin Miner',
        price: 10,
        quantity: 0,
        multiplier: 1
    },
    ethereumMiner: {
        name: 'Ethereum Miner',
        price: 20,
        quantity: 0,
        multiplier: 5
    },
    litecoinDrill: {
        name: 'Litecoin Drill',
        price: 30,
        quantity: 0,
        multiplier: 10
    }
};

let automaticUpgrades = {
    advancedMiner: {
        name: 'Advanced Miner',
        price: 40,
        quantity: 0,
        multiplier: 20
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.coin').addEventListener('click', mineBitcoin);
    document.getElementById('dogecoinMinerButton').addEventListener('click', () => buyClickUpgrade('dogecoinMiner'));
    document.getElementById('ethereumMinerButton').addEventListener('click', () => buyClickUpgrade('ethereumMiner'));
    document.getElementById('litecoinDrillButton').addEventListener('click', () => buyClickUpgrade('litecoinDrill'));
    document.getElementById('advancedMinerButton').addEventListener('click', () => buyAutomaticUpgrade('advancedMiner'));
    setInterval(collectAutoUpgrades, 3000);
});

function mineBitcoin() {
    console.log('Mining Bitcoin...');
    let clickValue = 1;
    for (const key in clickUpgrades) {
        clickValue += clickUpgrades[key].quantity * clickUpgrades[key].multiplier;
    }
    bitcoin += clickValue;
    updateDisplay();
    console.log(`Mined ${clickValue} bitcoin(s). Total now: ${bitcoin}`);
}

function buyClickUpgrade(upgradeKey) {
    console.log(`Attempting to buy ${upgradeKey} upgrade...`);
    const upgrade = clickUpgrades[upgradeKey];
    if (bitcoin >= upgrade.price) {
        bitcoin -= upgrade.price;
        upgrade.quantity++;
        upgrade.price = Math.ceil(upgrade.price * 1.1);
        updateDisplay();
    } else {
        alert("Not enough Bitcoin Bruh");
    }
}

function buyAutomaticUpgrade(upgradeKey) {
    console.log(`Attempting to buy automatic ${upgradeKey} upgrade...`);
    const upgrade = automaticUpgrades[upgradeKey];
    if (bitcoin >= upgrade.price) {
        bitcoin -= upgrade.price;
        upgrade.quantity++;
        upgrade.price = Math.ceil(upgrade.price * 1.1);
        updateDisplay();
    } else {
        alert("Not enough Bitcoin Bruh");
    }
}

function updateDisplay() {
    console.log('Updating display...');
    document.getElementById('bitcoinCount').innerText = bitcoin;
    document.getElementById('totalPerClick').innerText = calculateTotalPerClick();
    document.getElementById('totalPerAuto').innerText = calculateTotalPerAuto();

    for (const upgradeKey in clickUpgrades) {
        const upgrade = clickUpgrades[upgradeKey];
        document.getElementById(`${upgradeKey}Button`).innerText = `${upgrade.name} (${upgrade.price})`;
        document.getElementById(`${upgradeKey}Quantity`).innerText = upgrade.quantity;
    }

    for (const upgradeKey in automaticUpgrades) {
        const upgrade = automaticUpgrades[upgradeKey];
        document.getElementById(`${upgradeKey}Button`).innerText = `${upgrade.name} (${upgrade.price})`;
        document.getElementById(`${upgradeKey}Quantity`).innerText = upgrade.quantity;
    }

    console.log('Display updated.');
}

function calculateTotalPerClick() {
    return Object.values(clickUpgrades).reduce((total, upgrade) => total + (upgrade.quantity * upgrade.multiplier), 1);
}

function calculateTotalPerAuto() {
    return Object.values(automaticUpgrades).reduce((total, upgrade) => total + (upgrade.quantity * upgrade.multiplier), 0);
}

function collectAutoUpgrades() {
    bitcoin += calculateTotalPerAuto();
    updateDisplay();
}
