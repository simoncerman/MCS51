# Fixme List

---
*case 1 => P3 is not working well* 

when "MOV P1, #00000001b"

P3.0 is lit
and
P1.0 is lit

(testing on led)

Mainly by bug from first version -> reading is not same as in text editor - working too fast ? Why?


---
*case 2 => rework periphery input*
Create separated class peripheryInput which will have prepare same for button and switch (they will be childs) and each will have separeated execute met hode for self

---
*case 3 => problem with switch and button*

Switch and buttond dont read ground if it is on P pin - why ?

---