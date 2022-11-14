let instructions =
[
	{
		"id": 0,	
		"regex": "^\\s*acall\\s+(?:(?:[0-9]{1,4})|(?:[0-1]{1,11}b)|(?:[0-9a-f]{1,3}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //ACALL direct
	},
	{
		"id": 1,
		"regex": "^\\s*acall\\s+[a-z][a-z0-9]*\\s*$",
		"bytes": 2,
		"cycles": 2 //ACALL lable
	},
	{
		"id": 2,
		"regex": "^\\s*add\\s+a\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //ADD A, #immediate
	},
	{
		"id": 3,
		"regex": "^\\s*add\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //ADD A, @Ri
	},
	{
		"id": 4,
		"regex": "^\\s*add\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //ADD A, direct
	},
	{
		"id": 5,
		"regex": "^\\s*add\\s+a\\s*,\\s*r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //ADD A, Rn
	},
	{
		"id": 6,
		"regex": "^\\s*addc\\s+a\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //ADDC A, #immediate
	},
	{
		"id": 7,
		"regex": "^\\s*addc\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //ADDC A, @Ri
	},
	{
		"id": 8,
		"regex": "^\\s*addc\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //ADDC A, direct
	},
	{
		"id": 9,
		"regex": "^\\s*addc\\s+a\\s*,\\s*r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //ADDC A, Rn
	},
	{
		"id": 10,
		"regex": "^\\s*ajmp\\s+(?:(?:[0-9]{1,4})|(?:[0-1]{1,11}b)|(?:[0-9a-f]{1,3}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //AJMP direct
	},
	{
		"id": 11,
		"regex": "^\\s*ajmp\\s+[a-z][a-z0-9]*\\s*$",
		"bytes": 2,
		"cycles": 2 //AJMP lable
	},
	{
		"id": 12,
		"regex": "^\\s*anl\\s+a\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //ANL A, #immediate
	},
	{
		"id": 13,
		"regex": "^\\s*anl\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //ANL A, @Ri
	},
	{
		"id": 14,
		"regex": "^\\s*anl\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //ANL A, direct
	},
	{
		"id": 15,
		"regex": "^\\s*anl\\s+a\\s*,\\s*r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //ANL A, Rn
	},
	{
		"id": 16,
		"regex": "^\\s*anl\\s+c\\s*,\\s*[/]\\s*(?:(?:[0-9]{1-3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //ANL C, /bit
	},
	{
		"id": 17,
		"regex": "^\\s*anl\\s+c\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //ANL C, bit
	},
	{
		"id": 18,
		"regex": "^\\s*anl\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*a\\s*$",
		"bytes": 2,
		"cycles": 1 //ANL direct, A
	},
	{
		"id": 19,
		"regex": "^\\s*anl\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 3,
		"cycles": 2 //ANL direct, #immediate
	},
	{
		"id": 20,
		"regex": "^\\s*anl\\s+c\\s*,\\s*[/]\\s*(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*$",
		"bytes": 2,
		"cycles": 2 //ANL C, /spec
	},
	{
		"id": 21,
		"regex": "^\\s*anl\\s+c\\s*,\\s*(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*$",
		"bytes": 2,
		"cycles": 2 //ANL C, spec
	},
	{
		"id": 22,
		"regex": "^\\s*cjne\\s+@r[01]\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //CJNE @Ri, #immediate, label
	},
	{
		"id": 23,
		"regex": "^\\s*cjne\\s+a\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //CJNE A, #immediate, label
	},
	{
		"id": 24,
		"regex": "^\\s*cjne\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //CJNE A, direct, label
	},
	{
		"id": 25,
		"regex": "^\\s*cjne\\s+r[0-7]\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //CJNE Rn, #immediate, label
	},
	{
		"id": 26,
		"regex": "^\\s*clr\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //CLR A
	},
	{
		"id": 27,
		"regex": "^\\s*clr\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //CLR bit
	},
	{
		"id": 28,
		"regex": "^\\s*clr\\s+c\\s*$",
		"bytes": 1,
		"cycles": 1 //CLR C
	},
	{
		"id": 29,
		"regex": "^\\s*clr\\s+(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*$",
		"bytes": 2,
		"cycles": 1 //CLR spec
	},
	{
		"id": 30,
		"regex": "^\\s*cpl\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //CPL A
	},
	{
		"id": 31,
		"regex": "^\\s*cpl\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //CPL bit
	},
	{
		"id": 32,
		"regex": "^\\s*cpl\\s+c\\s*$",
		"bytes": 1,
		"cycles": 1 //CPL C
	},
	{
		"id": 33,
		"regex": "^\\s*cpl\\s+(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*$",
		"bytes": 2,
		"cycles": 1 //CPL spec
	},
	{
		"id": 34,
		"regex": "^\\s*da\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //DA A
	},
	{
		"id": 35,
		"regex": "^\\s*dec\\s+@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //DEC @Ri
	},
	{
		"id": 36,
		"regex": "^\\s*dec\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //DEC A
	},
	{
		"id": 37,
		"regex": "^\\s*dec\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //DEC direct
	},
	{
		"id": 38,
		"regex": "^\\s*dec\\s+r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //DEC Rn
	},
	{
		"id": 39,
		"regex": "^\\s*div\\s+ab\\s*$",
		"bytes": 1,
		"cycles": 4 //DIV AB
	},
	{
		"id": 40,
		"regex": "^\\s*djnz\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //DJNZ direct, label
	},
	{
		"id": 41,
		"regex": "^\\s*djnz\\s+r[0-7]\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 2,
		"cycles": 2 //DJNZ Rn, label
	},
	{
		"id": 42,
		"regex": "^\\s*inc\\s+@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //INC @Ri
	},
	{
		"id": 43,
		"regex": "^\\s*inc\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //INC A
	},
	{
		"id": 44,
		"regex": "^\\s*inc\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //INC direct
	},
	{
		"id": 45,
		"regex": "^\\s*inc\\s+dptr\\s*$",
		"bytes": 1,
		"cycles": 2 //INC DPTR
	},
	{
		"id": 46,
		"regex": "^\\s*inc\\s+r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //INC Rn
	},
	{
		"id": 47,
		"regex": "^\\s*jb\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //JB bit, label
	},
	{
		"id": 48,
		"regex": "^\\s*jb\\s+(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //JB spec, label
	},
	{
		"id": 49,
		"regex": "^\\s*jbc\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //JBC bit, label
	},
	{
		"id": 50,
		"regex": "^\\s*jbc\\s+(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //JBC spec, label
	},
	{
		"id": 51,
		"regex": "^\\s*jc\\s+[a-z][a-z0-9]*\\s*$",
		"bytes": 2,
		"cycles": 2 //JC label
	},
	{
		"id": 52,
		"regex": "^\\s*jmp\\s+@a\\s*[+]\\s*dptr\\s*$",
		"bytes": 1,
		"cycles": 2 //JMP @A+DPTR
	},
	{
		"id": 53,
		"regex": "^\\s*jnb\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //JNB bit, label
	},
	{
		"id": 54,
		"regex": "^\\s*jnb\\s+(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*,\\s*[a-z][a-z0-9]*\\s*$",
		"bytes": 3,
		"cycles": 2 //JNB spec, label
	},
	{
		"id": 55,
		"regex": "^\\s*jnc\\s+[a-z][a-z0-9]*\\s*$",
		"bytes": 2,
		"cycles": 2 //JNC label
	},
	{
		"id": 56,
		"regex": "^\\s*jnz\\s+[a-z][a-z0-9]*\\s*$",
		"bytes": 2,
		"cycles": 2 //JNZ label
	},
	{
		"id": 57,
		"regex": "^\\s*jz\\s+[a-z][a-z0-9]*\\s*$",
		"bytes": 2,
		"cycles": 2 //JZ label
	},
	{
		"id": 58,
		"regex": "^\\s*lcall\\s+(?:(?:[0-9]{1,5})|(?:[0-1]{1,16}b)|(?:[0-9a-f]{1,4}h))\\s*$",
		"bytes": 3,
		"cycles": 2 //LCALL addr
	},
	{
		"id": 59,
		"regex": "^\\s*ljmp\\s+(?:(?:[0-9]{1,5})|(?:[0-1]{1,16}b)|(?:[0-9a-f]{1,4}h))\\s*$",
		"bytes": 3,
		"cycles": 2 //LJMP addr
	},
	{
		"id": 60,
		"regex": "^\\s*mov\\s+@r[01]\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //MOV @Rn, #immediate
	},
	{
		"id": 61,
		"regex": "^\\s*mov\\s+@r[01]\\s*,\\s*a\\s*$",
		"bytes": 1,
		"cycles": 1 //MOV @Ri, A
	},
	{
		"id": 62,
		"regex": "^\\s*mov\\s+@r[01]\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //MOV @Ri, direct
	},
	{
		"id": 63,
		"regex": "^\\s*mov\\s+a\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //MOV A, #immediate
	},
	{
		"id": 64,
		"regex": "^\\s*mov\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //MOV A, @Ri
	},
	{
		"id": 65,
		"regex": "^\\s*mov\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //MOV A, direct
	},
	{
		"id": 66,
		"regex": "^\\s*mov\\s+a\\s*,\\s*r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //MOV A, Rn
	},
	{
		"id": 67,
		"regex": "^\\s*mov\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*c\\s*$",
		"bytes": 2,
		"cycles": 2 //MOV bit, C
	},
	{
		"id": 68,
		"regex": "^\\s*mov\\s+c\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //MOV C, bit
	},
	{
		"id": 69,
		"regex": "^\\s*mov\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 3,
		"cycles": 2 //MOV dest_direct, src_direct
	},
	{
		"id": 70,
		"regex": "^\\s*mov\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 3,
		"cycles": 2 //MOV direct, #immediate
	},
	{
		"id": 71,
		"regex": "^\\s*mov\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*@r[01]\\s*$",
		"bytes": 2,
		"cycles": 2 //MOV direct, @Rn
	},
	{
		"id": 72,
		"regex": "^\\s*mov\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*a\\s*$",
		"bytes": 2,
		"cycles": 1 //MOV direct, A
	},
	{
		"id": 73,
		"regex": "^\\s*mov\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*r[0-7]\\s*$",
		"bytes": 2,
		"cycles": 2 //MOV direct, Rn
	},
	{
		"id": 74,
		"regex": "^\\s*mov\\s+dptr\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 3,
		"cycles": 2 //MOV DPTR, #immediate
	},
	{
		"id": 75,
		"regex": "^\\s*mov\\s+r[0-7]\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //MOV Rn, #immediate
	},
	{
		"id": 76,
		"regex": "^\\s*mov\\s+r[0-7]\\s*,\\s*a\\s*$",
		"bytes": 1,
		"cycles": 1 //MOV Rn, A
	},
	{
		"id": 77,
		"regex": "^\\s*mov\\s+r[0-7]\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //MOV Rn, direct
	},
	{
		"id": 78,
		"regex": "^\\s*mov\\s+(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*,\\s*c\\s*$",
		"bytes": 2,
		"cycles": 2 //MOV spec, C
	},
	{
		"id": 79,
		"regex": "^\\s*mov\\s+c\\s*,\\s*(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*$",
		"bytes": 2,
		"cycles": 1 //MOV C, spec
	},
	{
		"id": 80,
		"regex": "^\\s*movc\\s+a\\s*,\\s*@a\\s*[+]\\s*dptr\\s*$",
		"bytes": 1,
		"cycles": 2 //MOVC A, @A+DPTR
	},
	{
		"id": 81,
		"regex": "^\\s*movc\\s+a\\s*,\\s*@a\\s*[+]\\s*pc\\s*$",
		"bytes": 1,
		"cycles": 2 //MOVC A, @A+PC
	},
	{
		"id": 82,
		"regex": "^\\s*movx\\s+@r[01]\\s*,\\s*a\\s*$",
		"bytes": 1,
		"cycles": 2 //MOVX @Ri, A
	},
	{
		"id": 83,
		"regex": "^\\s*movx\\s+a\\s*,\\s*@dptr\\s*$",
		"bytes": 1,
		"cycles": 2 //MOVX A, @DPTR
	},
	{
		"id": 84,
		"regex": "^\\s*movx\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 2 //MOVX A, @Ri
	},
	{
		"id": 85,
		"regex": "^\\s*mul\\s+ab\\s*$",
		"bytes": 1,
		"cycles": 4 //MUL AB
	},
	{
		"id": 86,
		"regex": "^\\s*nop\\s*$",
		"bytes": 1,
		"cycles": 1 //NOP
	},
	{
		"id": 87,
		"regex": "^\\s*orl\\s+a\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //ORL A, #immediate
	},
	{
		"id": 88,
		"regex": "^\\s*orl\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //ORL A, @Ri
	},
	{
		"id": 89,
		"regex": "^\\s*orl\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //ORL A, direct
	},
	{
		"id": 90,
		"regex": "^\\s*anl\\s+a\\s*,\\s*r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //ORL A, Rn
	},
	{
		"id": 91,
		"regex": "^\\s*orl\\s+c\\s*,\\s*[/]\\s*(?:(?:[0-9]{1-3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //ORL C, /bit
	},
	{
		"id": 92,
		"regex": "^\\s*orl\\s+c\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //ORL C, bit
	},
	{
		"id": 93,
		"regex": "^\\s*orl\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 3,
		"cycles": 2 //ORL direct, #immediate
	},
	{
		"id": 94,
		"regex": "^\\s*orl\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*a\\s*$",
		"bytes": 2,
		"cycles": 1 //ORL direct, A
	},
	{
		"id": 95,
		"regex": "^\\s*orl\\s+c\\s*,\\s*[/]\\s*(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*$",
		"bytes": 2,
		"cycles": 2 //ORL C, /spec
	},
	{
		"id": 96,
		"regex": "^\\s*orl\\s+c\\s*,\\s*(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*$",
		"bytes": 2,
		"cycles": 2 //ORL C, spec
	},
	{
		"id": 97,
		"regex": "^\\s*pop\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //POP direct
	},
	{
		"id": 98,
		"regex": "^\\s*push\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 2 //PUSH direct
	},
	{
		"id": 99,
		"regex": "^\\s*ret\\s*$",
		"bytes": 1,
		"cycles": 2 //RET
	},
	{
		"id": 100,
		"regex": "^\\s*reti\\s*$",
		"bytes": 1,
		"cycles": 2 //RETI
	},
	{
		"id": 101,
		"regex": "^\\s*rl\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //RL A
	},
	{
		"id": 102,
		"regex": "^\\s*rlc\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //RLC A
	},
	{
		"id": 103,
		"regex": "^\\s*rr\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //RR A
	},
	{
		"id": 104,
		"regex": "^\\s*rrc\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //RRC A
	},
	{
		"id": 105,
		"regex": "^\\s*setb\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //SETB bit
	},
	{
		"id": 106,
		"regex": "^\\s*setb\\s+c\\s*$",
		"bytes": 1,
		"cycles": 1 //SETB C
	},
	{
		"id": 107,
		"regex": "^\\s*setb\\s+(?:(?:(?:b|a|p[0-3])[.][0-7])|(?:tf[01]|tr[01]|ie[01]|it[01]|sm[0-2]|ren|[tr]b8|[tr]i|e[as]|et[01]|ex[01]|px[01]|pt[0-2]|ps?|cy|ac|f0|rs[01]|ov))\\s*$",
		"bytes": 2,
		"cycles": 1 //SETB spec
	},
	{
		"id": 108,
		"regex": "^\\s*sjmp\\s+[a-z][a-z0-9]*\\s*$",
		"bytes": 2,
		"cycles": 2 //SJMP label
	},
	{
		"id": 109,
		"regex": "^\\s*subb\\s+a\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //SUBB A, #immediate
	},
	{
		"id": 110,
		"regex": "^\\s*subb\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //SUBB A, @Ri
	},
	{
		"id": 111,
		"regex": "^\\s*subb\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //SUBB A, direct
	},
	{
		"id": 112,
		"regex": "^\\s*subb\\s+a\\s*,\\s*r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //SUBB A, Rn
	},
	{
		"id": 113,
		"regex": "^\\s*swap\\s+a\\s*$",
		"bytes": 1,
		"cycles": 1 //SWAP A
	},
	{
		"id": 114,
		"regex": "^\\s*xch\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //XCH A, @Ri
	},
	{
		"id": 115,
		"regex": "^\\s*xch\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //XCH A, direct
	},
	{
		"id": 116,
		"regex": "^\\s*xch\\s+a\\s*,\\s*r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //XCH A, Rn
	},
	{
		"id": 117,
		"regex": "^\\s*xchd\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //XCHD A, @Ri
	},
	{
		"id": 118,
		"regex": "^\\s*xrl\\s+a\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //XRL A, #immediate
	},
	{
		"id": 119,
		"regex": "^\\s*xrl\\s+a\\s*,\\s*@r[01]\\s*$",
		"bytes": 1,
		"cycles": 1 //XRL A, @Ri
	},
	{
		"id": 120,
		"regex": "^\\s*xrl\\s+a\\s*,\\s*(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 2,
		"cycles": 1 //XRL A, direct
	},
	{
		"id": 121,
		"regex": "^\\s*xrl\\s+a\\s*,\\s*r[0-7]\\s*$",
		"bytes": 1,
		"cycles": 1 //XRL A, Rn
	},
	{
		"id": 122,
		"regex": "^\\s*xrl\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*#(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*$",
		"bytes": 3,
		"cycles": 2 //XRL direct, #immediate
	},
	{
		"id": 123,
		"regex": "^\\s*xrl\\s+(?:(?:[0-9]{1,3})|(?:[0-1]{1,8}b)|(?:[0-9a-f]{1,2}h))\\s*,\\s*a\\s*$",
		"bytes": 2,
		"cycles": 1 //XRL direct, A
	}
]