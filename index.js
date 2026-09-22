// SPAM WA SCRIPT - © DanzModss
// WARNING: GUNAKAN DENGAN RISIKO SENDIRI!

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(chalk.red(`
╔══════════════════════════════════════╗
║   💀 SPAM WA SCRIPT - © ZenDlouis    ║
║   Status: STARTING...                ║
╚══════════════════════════════════════╝
`));

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log(chalk.yellow('[!] Scan QR code di bawah pake WhatsApp lu:'));
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log(chalk.green(`
╔══════════════════════════════════════╗
║   ✅ BOT BERHASIL TERHUBUNG! ✅      ║
║   © ZenDlouis - Spam WA Script       ║
╚══════════════════════════════════════╝
    `));
    
    mainMenu();
});

client.on('auth_failure', () => {
    console.log(chalk.red('[❌] Autentikasi gagal!'));
});

client.on('disconnected', (reason) => {
    console.log(chalk.red(`[❌] Bot terputus: ${reason}`));
});

function mainMenu() {
    console.log(chalk.cyan(`
╔══════════════════════════════════════╗
║          📋 MENU SPAM WA             ║
╠══════════════════════════════════════╣
║ [1] Spam Pesan Teks                  ║
║ [2] Spam Gambar                      ║
║ [3] Spam Sticker                     ║
║ [4] Spam Pesan Berulang              ║
║ [5] Spam Massal (Multiple Target)    ║
║ [0] Keluar                           ║
╚══════════════════════════════════════╝
    `));
    
    rl.question(chalk.yellow('[>] Pilih menu: '), (choice) => {
        switch(choice) {
            case '1':
                spamText();
                break;
            case '2':
                spamImage();
                break;
            case '3':
                spamSticker();
                break;
            case '4':
                spamRepeat();
                break;
            case '5':
                spamMassal();
                break;
            case '0':
                console.log(chalk.red('[!] Keluar...'));
                process.exit(0);
            default:
                console.log(chalk.red('[❌] Pilihan gak valid!'));
                mainMenu();
        }
    });
}

// ===== SPAM TEKS =====
function spamText() {
    rl.question(chalk.yellow('[?] Nomor target (62xxx): '), (nomor) => {
        rl.question(chalk.yellow('[?] Pesan spam: '), (pesan) => {
            rl.question(chalk.yellow('[?] Jumlah spam: '), (jumlah) => {
                rl.question(chalk.yellow('[?] Delay (ms): '), (delay) => {
                    const chatId = nomor + '@c.us';
                    const total = parseInt(jumlah);
                    const delayMs = parseInt(delay);
                    
                    console.log(chalk.red(`\n[💀] MULAI SPAM KE ${nomor}...\n`));
                    
                    let count = 0;
                    const interval = setInterval(async () => {
                        try {
                            await client.sendMessage(chatId, pesan);
                            count++;
                            console.log(chalk.green(`[+] Spam ke-${count}/${total} terkirim!`));
                            
                            if (count >= total) {
                                clearInterval(interval);
                                console.log(chalk.red(`\n[✅] SPAM SELESAI! ${total} pesan terkirim!`));
                                mainMenu();
                            }
                        } catch (err) {
                            console.log(chalk.red(`[❌] Error: ${err.message}`));
                            clearInterval(interval);
                            mainMenu();
                        }
                    }, delayMs);
                });
            });
        });
    });
}

// ===== SPAM GAMBAR =====
function spamImage() {
    rl.question(chalk.yellow('[?] Nomor target (62xxx): '), (nomor) => {
        rl.question(chalk.yellow('[?] URL gambar: '), (url) => {
            rl.question(chalk.yellow('[?] Jumlah spam: '), (jumlah) => {
                rl.question(chalk.yellow('[?] Delay (ms): '), (delay) => {
                    const chatId = nomor + '@c.us';
                    const total = parseInt(jumlah);
                    const delayMs = parseInt(delay);
                    
                    console.log(chalk.red(`\n[💀] MULAI SPAM GAMBAR KE ${nomor}...\n`));
                    
                    let count = 0;
                    const interval = setInterval(async () => {
                        try {
                            const { MessageMedia } = require('whatsapp-web.js');
                            const media = await MessageMedia.fromUrl(url);
                            await client.sendMessage(chatId, media);
                            count++;
                            console.log(chalk.green(`[+] Gambar ke-${count}/${total} terkirim!`));
                            
                            if (count >= total) {
                                clearInterval(interval);
                                console.log(chalk.red(`\n[✅] SPAM GAMBAR SELESAI!`));
                                mainMenu();
                            }
                        } catch (err) {
                            console.log(chalk.red(`[❌] Error: ${err.message}`));
                            clearInterval(interval);
                            mainMenu();
                        }
                    }, delayMs);
                });
            });
        });
    });
}

// ===== SPAM STICKER =====
function spamSticker() {
    rl.question(chalk.yellow('[?] Nomor target (62xxx): '), (nomor) => {
        rl.question(chalk.yellow('[?] URL sticker (webp): '), (url) => {
            rl.question(chalk.yellow('[?] Jumlah spam: '), (jumlah) => {
                rl.question(chalk.yellow('[?] Delay (ms): '), (delay) => {
                    const chatId = nomor + '@c.us';
                    const total = parseInt(jumlah);
                    const delayMs = parseInt(delay);
                    
                    console.log(chalk.red(`\n[💀] MULAI SPAM STICKER KE ${nomor}...\n`));
                    
                    let count = 0;
                    const interval = setInterval(async () => {
                        try {
                            const { MessageMedia } = require('whatsapp-web.js');
                            const media = await MessageMedia.fromUrl(url);
                            await client.sendMessage(chatId, media, { sendMediaAsSticker: true });
                            count++;
                            console.log(chalk.green(`[+] Sticker ke-${count}/${total} terkirim!`));
                            
                            if (count >= total) {
                                clearInterval(interval);
                                console.log(chalk.red(`\n[✅] SPAM STICKER SELESAI!`));
                                mainMenu();
                            }
                        } catch (err) {
                            console.log(chalk.red(`[❌] Error: ${err.message}`));
                            clearInterval(interval);
                            mainMenu();
                        }
                    }, delayMs);
                });
            });
        });
    });
}

// ===== SPAM PESAN BERULANG =====
function spamRepeat() {
    rl.question(chalk.yellow('[?] Nomor target (62xxx): '), (nomor) => {
        rl.question(chalk.yellow('[?] Pesan: '), (pesan) => {
            rl.question(chalk.yellow('[?] Jumlah spam: '), (jumlah) => {
                const chatId = nomor + '@c.us';
                const total = parseInt(jumlah);
                
                console.log(chalk.red(`\n[💀] MULAI SPAM KE ${nomor}...\n`));
                
                let count = 0;
                const interval = setInterval(async () => {
                    try {
                        await client.sendMessage(chatId, pesan);
                        count++;
                        console.log(chalk.green(`[+] Spam ke-${count}/${total}`));
                        
                        if (count >= total) {
                            clearInterval(interval);
                            console.log(chalk.red(`\n[✅] SPAM SELESAI!`));
                            mainMenu();
                        }
                    } catch (err) {
                        console.log(chalk.red(`[❌] Error: ${err.message}`));
                        clearInterval(interval);
                        mainMenu();
                    }
                }, 0); // Tanpa delay = SPAM GILA!
            });
        });
    });
}

// ===== SPAM MASSAL =====
function spamMassal() {
    rl.question(chalk.yellow('[?] Nomor target (pisah pake koma): '), (nomorList) => {
        rl.question(chalk.yellow('[?] Pesan spam: '), (pesan) => {
            rl.question(chalk.yellow('[?] Jumlah per nomor: '), (jumlah) => {
                rl.question(chalk.yellow('[?] Delay (ms): '), (delay) => {
                    const targets = nomorList.split(',').map(n => n.trim() + '@c.us');
                    const total = parseInt(jumlah);
                    const delayMs = parseInt(delay);
                    
                    console.log(chalk.red(`\n[💀] MULAI SPAM MASSAL KE ${targets.length} TARGET...\n`));
                    
                    let count = 0;
                    const interval = setInterval(async () => {
                        try {
                            for (const chatId of targets) {
                                await client.sendMessage(chatId, pesan);
                                console.log(chalk.green(`[+] Spam ke ${chatId} terkirim!`));
                            }
                            count++;
                            
                            if (count >= total) {
                                clearInterval(interval);
                                console.log(chalk.red(`\n[✅] SPAM MASSAL SELESAI!`));
                                mainMenu();
                            }
                        } catch (err) {
                            console.log(chalk.red(`[❌] Error: ${err.message}`));
                        }
                    }, delayMs);
                });
            });
        });
    });
}

client.initialize();
