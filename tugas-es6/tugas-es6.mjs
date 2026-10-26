// 1. Data array objek (minim 6 transaksi)
const transaksi = [
  { id: 1, barang: 'Buku Gambar A4', harga: 15_000, qty: 2, kategori: 'Alat Tulis' },
  { id: 2, barang: 'Pensil 2B', harga: 4_000, qty: 5, kategori: 'Alat Tulis' },
  { id: 3, barang: 'Pensil Corcoal', harga: 8_000, qty: 3, kategori: 'Alat Tulis' },
  { id: 4, barang: 'Penghapus Karet', harga: 3_000, qty: 2, kategori: 'Alat Tulis' },
  { id: 5, barang: 'Blending ART', harga: 3_500, qty: 4, kategori: 'Alat Arsir' },
  { id: 6, barang: 'Pisau cutter', harga: 7_000, qty: 2, kategori: 'Penajam Pensil' }
];

console.log('Data Transaksi Belanja:');
console.table(transaksi);

// 2. filter(): menyaring kategori tertentu pakai destructuring ({ kategori })
const kategoriDicari = 'Alat Tulis';
const hasilFilter = transaksi.filter(({ kategori }) => kategori === kategoriDicari);

console.log(`\nHasil Filter Kategori: ${kategoriDicari}`);
console.table(hasilFilter);

// 3. map(): menghitung subtotal tiap barang menggunakan destructuring
const subtotalSemua = transaksi.map(({ barang, harga, qty }) => ({
  barang,
  harga,
  qty,
  subtotal: harga * qty
}));

console.log('\nSubtotal Setiap Barang:');
console.table(subtotalSemua);

// 4. reduce(): menghitung total keseluruhan dan total kategori terpilih
const totalBelanja = subtotalSemua.reduce((acc, { subtotal }) => acc + subtotal, 0);

const totalKategori = hasilFilter
  .map(({ harga, qty }) => ({ subtotal: harga * qty }))
  .reduce((acc, { subtotal }) => acc + subtotal, 0);

console.log(`\nTotal Belanja: Rp${totalBelanja.toLocaleString('id-ID')}`);
console.log(`Total ${kategoriDicari}: Rp${totalKategori.toLocaleString('id-ID')}`);