int displayStart = 12;
int displayEnd = 13;
int segmentStart = 1;
int segmentEnd = 7;

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

byte showNumbers[] = {9,5};


void loop()
{
  for (int d = displayStart; d <= displayEnd; d++)
    {
        digitalWrite(d, 0);

        for (int s = segmentStart; s <= segmentEnd; s++)
        {
            digitalWrite(s, numbers[showNumbers[d-displayStart]][s-segmentStart]);
            delay(1);
            digitalWrite(s, 0);
        }

        digitalWrite(d, 1);
    }
  
}