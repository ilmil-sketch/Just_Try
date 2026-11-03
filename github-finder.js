// 1. Ambil elemen HTML yang dibutuhkan
const searchForm = document.querySelector('#search-form');
const usernameInput = document.querySelector('#username-input');
const resultContainer = document.querySelector('#result-container');
const loading = document.querySelector('#loading');

// 2. Fungsi asynchronous untuk request ke GitHub API
const fetchGitHubUser = async (username) => {
  try {
    // Bersihkan hasil sebelumnya dan nyalakan tulisan loading
    resultContainer.innerHTML = '';
    loading.style.display = 'block';

    const response = await fetch(`https://api.github.com/users/${username}`);

    // Kalau status 404: user tidak ditemukan di GitHub
    if (response.status === 404) {
      resultContainer.innerHTML = '<p class="error">User tidak ditemukan</p>';
      return;
    }

    // Kalau status selain 200 dan bukan 404 (misal masalah server)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Ambil data dalam bentuk objek JSON
    const data = await response.json();

    // Buat tampilan kartu profilnya
    const profile = document.createElement('div');
    profile.className = 'profile';
    profile.innerHTML = `
      <img src="${data.avatar_url}" alt="Foto Profil">
      <h3>${data.name || data.login}</h3>
      <p>${data.bio || 'Tidak ada bio yang dicantumkan.'}</p>
      <p>Repo Publik: <strong>${data.public_repos}</strong></p>
      <a href="${data.html_url}" target="_blank">Lihat di GitHub</a>
    `;

    resultContainer.appendChild(profile);

  } catch (error) {
    resultContainer.innerHTML = `<p class="error">Terjadi kesalahan koneksi.</p>`;
  } finally {
    // Matikan teks loading baik proses berhasil maupun gagal
    loading.style.display = 'none';
  }
};

// 3. Tangani event saat tombol form ditekan
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (username) {
    fetchGitHubUser(username);
  }
});
