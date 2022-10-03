
const pattern = "1234567890QWERTYUIOPASDFGHJKLÇZXCVBNMqwertyuiopasdfghjklçzxcvbnm_";

async function gen(size) {
    let key = "";

    let chars = pattern.split("");

    for(let i = 0; i < (size - 1); i++) {
        key += chars[Math.floor(Math.random() * chars.length)];
    }

    key += Math.floor(Math.random() * 9)

    return key;
}

module.exports.gen = gen;