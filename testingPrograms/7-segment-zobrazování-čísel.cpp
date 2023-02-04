int displayStart = 12;
int displayEnd = 13;
int segmentStart = 1;
int segmentEnd = 7;
long cas;

void setup()
{
    for (int i = displayStart; i <= displayEnd; i++)
    {
        pinMode(i, OUTPUT);
        digitalWrite(i, 1);
    }

    for (int i = segmentStart; i <= segmentEnd; i++)
    {
        pinMode(i, OUTPUT);
        digitalWrite(i, 0);
    }

     
    cas=millis();
}

byte numbers[10][7] = {
    {1,1,1,1,1,1,0}, //0
    {0,1,1,0,0,0,0}, //1
    {1,1,0,1,1,0,1}, //2
    {1,1,1,1,0,0,1}, //3
    {0,1,1,0,0,1,1}, //4
    {1,0,1,1,0,1,1}, //5
    {1,0,1,1,1,1,1}, //6
    {1,1,1,0,0,0,0}, //7
    {1,1,1,1,1,1,1}, //8
    {1,1,1,1,0,1,1} //9
};

byte showNumbers[] = {9,5,3,2,1,6};


void loop()
{
  displayNumber();
  timer();
}

void timer(){
    if(millis()-cas>=20)
    {
        //změna čísla
        if(showNumbers[3]<9)
        {
            showNumbers[3]--;
        }
        else
        {
            showNumbers[3]=0;
            if(showNumbers[2]<9)
            {
                showNumbers[2]--;
            }
            else
            {
                showNumbers[2]=0;
                if(showNumbers[1]<9)
                {
                    showNumbers[1]--;
                }
                else
                {
                    showNumbers[1]=0;
                    if(showNumbers[0]<9)
                    {
                        showNumbers[0]--;
                    }
                    else
                    {
                        showNumbers[0]=0;
                    }
                }    
            }
        }

}

void displayNumber() 
{
    for (int d = displayStart; d <= displayEnd; d++)
    {
        digitalWrite(d, 0);

        for (int s = segmentStart; s <= segmentEnd; s++)
        {
            digitalWrite(s, numbers[cas[showNumbers[d-displayStart]]][s-segmentStart]);
            delay(1);
            digitalWrite(s, 0);
        }

        digitalWrite(d, 1);
    }
}
            }
        }
    }
}