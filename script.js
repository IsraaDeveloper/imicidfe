async function shortenLink() {
    const longUrl = document.getElementById("longUrl").value;
    const customSlug = document.getElementById("customSlug").value;

    if (!longUrl) {
        alert("Masukkan URL terlebih dahulu!");
        return;
    }

    const response = await fetch("https://imicidbe.vercel.app/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ long_url: longUrl, custom_slug: customSlug }),
    });

    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
        document.getElementById("result").innerHTML = `
            <p>Short Link: <a href="${data.short_url}" target="_blank">${data.short_url}</a></p>
        `;
    }
}
