interface AccordionItem {
  value: string;
  title: string;
  content: string;
}

export const AccordionItems: AccordionItem[] = [
  {
    value: "item-1",
    title: "Apa itu Jual Tani?",
    content:
      "Jual Tani adalah platform jual beli produk pertanian hortikultura yang menghubungkan petani langsung dengan pembeli. Kami menyediakan marketplace digital untuk memudahkan transaksi produk pertanian segar seperti sayuran, buah-buahan, rempah, umbi, dan biji-bijian dengan harga yang kompetitif dan kualitas terjamin.",
  },
  {
    value: "item-2",
    title: "Bagaimana cara buat akun di Jual Tani?",
    content:
      "Untuk membuat akun, klik tombol 'Daftar' di halaman utama. Pilih jenis akun yang sesuai - 'Pembeli' jika Anda ingin membeli produk pertanian, atau 'Penjual' jika Anda ingin menjual produk. Isi formulir pendaftaran dengan username, email, dan password Anda. Setelah berhasil mendaftar, Anda dapat langsung menggunakan akun Anda untuk bertransaksi.",
  },
  {
    value: "item-3",
    title: "Bagaimana proses order menggunakan Jual Tani?",
    content:
      "Setelah menemukan produk yang Anda inginkan, klik tombol 'Order Lewat WA' pada halaman detail produk. Anda dapat mengatur jumlah barang yang ingin dibeli, kemudian sistem akan menghubungkan Anda langsung dengan penjual melalui WhatsApp untuk menyelesaikan transaksi. Pembayaran dan pengiriman akan diatur langsung antara pembeli dan penjual untuk memastikan fleksibilitas dan kenyamanan kedua belah pihak.",
  },
];
