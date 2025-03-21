import sys
import pandas as pd
import matplotlib.pyplot as plt

if len(sys.argv) < 2:
    print("No file provided")
    sys.exit(1)

file_path = sys.argv[1]

df = pd.read_csv(file_path) #read File 

print("Data shape:", df.shape) # Data Shape and Size
print("\nData types:\n", df.dtypes) # Variable Types

# Missing Values
print("\nMissing values:\n", df.isnull().sum())

df['Date'] = pd.to_datetime(df['Date'])
df.set_index('Date', inplace=True)

df['Moving_Avg'] = df['Close'].rolling(window=20).mean()

plt.figure(figsize=(10, 5))

plt.plot(df.index, df['Close'], label="Close Price", color='blue')
plt.plot(df.index, df['Moving_Avg'], label="Moving Average", linestyle='dashed', color='red')
plt.legend()
plt.title("Stock Price Trend")
plt.savefig("trend.png")
print("Analysis completed. Plot saved as trend.png")
