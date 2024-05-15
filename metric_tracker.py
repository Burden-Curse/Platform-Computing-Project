import csv
import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from Users import user63 as user
import mysql.connector

def WritetoCSV(filename : str, metrics : dict):
    with open(file=filename, mode='w', newline="") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=metrics[0].keys())
        writer.writeheader()

        for i in metrics:
            writer.writerow(i)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Gerlie100", #Blank on purpose
    database="cse4500"
)

mycursor = mydb.cursor()

sqlFormula = "INSERT INTO measurements1 (`TimeStamp`, `Iteration Number`, `Presence Time`, `Control or Test`, `File Name`) VALUES (%s, %s, %s, %s, %s)"

def main():
    # Initialize browser
    driver = webdriver.Firefox() #I don't have Chrome, change this to preferred browser

    Title = driver.get("http://localhost:3000/")

    driver.implicitly_wait(0.5) #probably helps for a buffer

    metrics = []
    # Track presence time
    count = 0
    SAMPLE_SIZE = 2
    start_time = time.time()
    presence_time = start_time

    file_path = "/Metric_tracker/Users/User63.py"
    Filename = os.path.basename(file_path)

    presence_time = user.userAction(driver)
    while count < SAMPLE_SIZE:#presence_time < 50: # seconds
        Group = "Test"
        TimeStamp = time.strftime("%H:%M:%S", time.localtime())
        Iteration = '1'
        mycursor.execute(sqlFormula, (TimeStamp, Iteration, presence_time, Group, Filename))

        #metrics.append({"TimeStamp (HH:MM:SS)": TimeStamp,
        #                "Presense Time (Seconds)" : presence_time,
        #                "Scrolling (current Pixel)" : current_scroll,
        #                "Title Name" : Title_name})
        
        time.sleep(2)
        count += 1
        
        
    driver.quit()
    #WritetoCSV("Measurements.csv", metrics)
    mydb.commit()



if __name__ == "__main__":
    main()



###############################################
#Leaving in all my fail attempts for referrence
###############################################
        #for i in metrics:
        #    csv_writer.writerow(i)
    
    #time.sleep(2) 

    #print(f"Current Scroll pixel: {current_scroll}")
    #print(f"Current Presense Time: {metrics[1]}")
    #print(Title)
    
    #try:
        #selenium.common.exceptions.NoSuchWindowException == False
    #    driver.getTitle();
    #except:
        #break

    # Track clicks   
    # buttons = driver.find_elements_by_tag_name("button")
    # num_clicks = 0

    
        
    # print(f"Number of clicks: {num_clicks}")
#print(presence_time)
#print(f"Scrolled {current_scroll}/{scroll_height} pixels")
