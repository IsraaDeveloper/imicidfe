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
                document.getElementById("shortLink").href = data.short_url;
                document.getElementById("shortLink").innerText = data.short_url;
                new QRCode(document.getElementById("qrcode"), data.short_url);
                showPopup();
            }
        }
        
        function showPopup() {
            document.getElementById("popup").style.display = "block";
        }
        
        function closePopup() {
            document.getElementById("popup").style.display = "none";
        }
        
        function shareToWhatsApp() {
            const url = document.getElementById("shortLink").href;
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, "_blank");
        }
        
        function copyToClipboard() {
            const url = document.getElementById("shortLink").href;
            navigator.clipboard.writeText(url);
            alert("Link berhasil disalin!");
        }
