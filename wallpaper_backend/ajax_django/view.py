from django.http import HttpResponse
import os
from ajax_django import models
import json
import uuid
import qiniu
import datetime
import sqlite3

# class WallpaperInfo(models.Model):
#     ID = models.CharField(max_length=200, primary_key = True,db_index =True)
#     uploadTime = models.DateTimeField()
#     downloadpath = models.CharField(max_length = 1023)
#     countID = models.IntegerField()
#
access_key = 'YOUR_ACCESS_KEY'
secret_key = 'YOUR_SECRET_KEY'
url = 'QINIU_PROVIDED_DOMIN'
bucket_name = 'YOUR_BUCKET_NAME'
q = qiniu.Auth(access_key, secret_key)

def qiniu_upload(key, localfile):
    token = q.upload_token(bucket_name, key, 3600)

    ret, info = qiniu.put_file(token, key, localfile)

    if ret:
        return '{0}/{1}'.format(url, ret['key'])

def check():

    absPath = os.path.abspath('.')
    path = absPath + "/ajax_django/static/weAppWallpaper"
    print(path)
    # path = "./weAppWallpaper"
    files = os.listdir(path)
    if len(files) is 0:
        return
    print(files)
    # return

    for item in files:
        if "DS_Store" in item:
            continue
        curUUID = uuid.uuid5(uuid.NAMESPACE_DNS, item)
        print(curUUID)
        os.rename(path + "/" + item, path + "/" + str(curUUID)+'.jpg')

    files = os.listdir(path)

    with sqlite3.connect(absPath + '/db.sqlite3') as conn:
        cursor = conn.cursor()
        sqlQueryMaxCount = "SELECT max(countID) from ajax_django_wallpaperinfo"
        maxCountID = cursor.execute(sqlQueryMaxCount).fetchone()[0]
        print(maxCountID)

        for i, item in enumerate(files):
            if ".DS_Store" in str(item):
                continue
            key = item.replace(".jpg", "")
            localfile = path + '/' + item
            uploadTime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            # print(localfile)
            itemURL = qiniu_upload(key, localfile)
            # print(res)
            cursor = conn.cursor()

            sqlcommand = "INSERT INTO ajax_django_wallpaperinfo (ID,uploadTime,downloadpath,countID) VALUES ('%s','%s','%s','%s')"
            cursor.execute(sqlcommand % (item.replace(".jpg", ""), uploadTime, "http://" + itemURL, str(maxCountID + 1)))
            maxCountID = maxCountID + 1
            conn.commit()
            print(str(i + 1) + " " + item.replace(".jpg", "") + "\n " + str(itemURL))
            try:
                os.remove(path + "/" + item)
            except Exception:
                print("ERROR")

def getwallpaper(request):
    check()
    if request.method == "GET" :
        print(request.GET)
        # print(code)
        list = models.WallpaperInfo.objects.all()
        print(list)
        jsonResult = [{"ID": obj.ID,
                       "uploadTime": str(obj.uploadTime),
                       "downloadpath": obj.downloadpath,
                       "countID": obj.countID} for obj in list]
        jsonResult.sort(key = lambda x:x["countID"])
        jsonResult = json.dumps(jsonResult,indent=4)
        return HttpResponse(jsonResult)
    return HttpResponse("Please use get methed.")



