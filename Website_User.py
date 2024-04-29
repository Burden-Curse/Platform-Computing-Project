import time
from selenium import webdriver
from selenium.webdriver.common.by import By

def FindKeyword(driver, keyword):
    if keyword.lower() in driver.page_source.lower():
        return True
    else:
        return False

def CountElements(driver, tag_name)->int:
    count = 0
    for tags in tag_name:
        count += len(driver.find_elements(By.TAG_NAME, tags))
    return count

def ClickLink(driver, tag_name):
    links = driver.find_elements(By.TAG_NAME, tag_name)
    for link in links:
        link.click()
    

def UserActions(action, driver, reward_time, req_list)->float:
    total_reward = 0
    if action.upper() == "KEYWORD":
        for key in req_list:
            if FindKeyword(driver, key):
                total_reward += reward_time
                #time.sleep(reward_time)
            else:
                print(key,"Not found")
    elif action.upper() == "ELEMENT":
        number_images = CountElements(driver, req_list)
        total_reward += number_images*reward_time
        #time.sleep(total_reward)
    elif action.upper() == "LINK":
        number_links = CountElements(driver, req_list)
        total_reward += reward_time * number_links
            #time.sleep(reward_time)

        #time.sleep(total_reward)
    return total_reward

def main():
    # Initialize browser
    driver = webdriver.Firefox() #I don't have Chrome, change this to preferred browser
    # Navigate to your website 
    driver.get("http://localhost:3000/")
    total_reward_time = 0
    #reward_time = 10
    keywords = ["Student","struggled"]
    tags = ["img", "p", ]
    link = ["a"]
    total_reward_time += UserActions("KEYWORD", driver, 7, keywords)
    total_reward_time += UserActions("ELEMENT", driver, 5, tags)
    total_reward_time += UserActions("LINK", driver, 10, link)
    driver.quit()

    print("Presence Time:", total_reward_time)



if __name__ == "__main__":
    main()