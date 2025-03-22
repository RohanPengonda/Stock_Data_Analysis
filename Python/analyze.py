import sys
import pandas as pd
import matplotlib.pyplot as plt
import os
import shutil

if len(sys.argv) < 2:
    print("No file provided")
    sys.exit(1)

file_path = sys.argv[1]

df = pd.read_csv(file_path)
# 

df['Moving_Avg'] = df['Close'].rolling(window=20).mean()

plt.figure(figsize=(10, 5))
plt.plot(df.index, df['Close'], label="Close Price", color='blue')
plt.plot(df.index, df['Moving_Avg'], label="Moving Average", linestyle='dashed', color='red')
plt.legend()
plt.title("Stock Price Trend")

script_dir = os.path.dirname(os.path.abspath(__file__))
image_path = os.path.join(script_dir, "trend.png")
plt.savefig(image_path)
plt.close()

backend_dir = os.path.abspath(os.path.join(script_dir, "../Backend/project"))
final_path = os.path.join(backend_dir, "trend.png")
shutil.move(image_path, final_path)

print(f"Analysis completed. Plot saved as {image_path}")
