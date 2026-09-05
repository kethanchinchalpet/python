"""A small Tkinter animation that displays the name Sunny."""

import math
import tkinter as tk


WIDTH, HEIGHT = 760, 420


class SunnyAnimation:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Sunny Animation")
        self.root.resizable(False, False)

        self.canvas = tk.Canvas(root, width=WIDTH, height=HEIGHT, bg="#07152e", highlightthickness=0)
        self.canvas.pack()

        self.time = 0
        self.stars = [(45, 75), (135, 160), (230, 58), (565, 78), (680, 145), (710, 315), (82, 330)]
        self.name = self.canvas.create_text(
            WIDTH // 2,
            HEIGHT // 2,
            text="Sunny",
            font=("Helvetica", 68, "bold"),
            fill="#ffd54a",
        )
        self.subtitle = self.canvas.create_text(
            WIDTH // 2,
            HEIGHT // 2 + 75,
            text="shine bright!",
            font=("Helvetica", 18, "italic"),
            fill="#d6e7ff",
        )
        self.animate()

    def animate(self) -> None:
        self.time += 0.08
        glow = int(185 + 70 * (math.sin(self.time) + 1) / 2)
        colour = f"#ff{glow:02x}4a"
        y = HEIGHT // 2 + math.sin(self.time * 1.5) * 12

        self.canvas.itemconfig(self.name, fill=colour)
        self.canvas.coords(self.name, WIDTH // 2, y)
        self.canvas.coords(self.subtitle, WIDTH // 2, y + 75)

        self.canvas.delete("sparkle")
        for index, (x, star_y) in enumerate(self.stars):
            size = 2 + int(4 * (math.sin(self.time * 2 + index) + 1) / 2)
            self.canvas.create_oval(x - size, star_y - size, x + size, star_y + size,
                                    fill="#ffffff", outline="", tags="sparkle")

        self.root.after(30, self.animate)


if __name__ == "__main__":
    window = tk.Tk()
    SunnyAnimation(window)
    window.mainloop()
