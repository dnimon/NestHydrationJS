'use strict';

var NestHydrationJS = require('../../NestHydrationJS');

describe('NestHydrationJS', function () {
	describe('nest method', function () {
		describe('null data', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: 'a'
				};
				var data = null;
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = null;
				expect(result).toEqual(expected);
			});
		});
		
		describe('empty data', function () {
			var result;
			beforeEach(function () {
				var mapping = [{
					a: 'a'
				}];
				var data = [];
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = [];
				expect(result).toEqual(expected);
			});
		});
		
		describe('simple mapping', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: 'a'
				};
				var data = {a: 'value 1'};
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = {a: 'value 1'};
				expect(result).toEqual(expected);
			});
		});
		
		describe('simple mapping, number type', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: {column: 'a', type: 'NUMBER'}
				};
				var data = {a: '1'};
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = {a: 1};
				expect(result).toEqual(expected);
			});
		});
		
		describe('simple mapping, number type, float', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: {column: 'a', type: 'NUMBER'}
				};
				var data = {a: '1.1'};
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = {a: 1.1};
				expect(result).toEqual(expected);
			});
		});
		
		describe('simple mapping, boolean type', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: {column: 'a', type: 'BOOLEAN'}
				};
				var data = {a: '1'};
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = {a: true};
				expect(result).toEqual(expected);
			});
		});
		
		describe('simple mapping, boolean type, false', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: {column: 'a', type: 'BOOLEAN'}
				};
				var data = {a: '0'};
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = {a: false};
				expect(result).toEqual(expected);
			});
		});
		
		describe('simple mapping, redundant data', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: 'a'
				};
				var data = {a: 'value 1', b: 'value 2'};
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = {a: 'value 1'};
				expect(result).toEqual(expected);
			});
		});
		
		describe('multiple mapping', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: 'a',
					b: 'b'
				};
				var data = {a: 'value 1', b: 'value 2'};
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = {a: 'value 1', b: 'value 2'};
				expect(result).toEqual(expected);
			});
		});
		
		describe('multiple mapping, number type, null', function () {
			var result;
			beforeEach(function () {
				var mapping = {
					a: {column: 'a', type: 'NUMBER'},
					b: {column: 'b', type: 'NUMBER'}
				};
				var data = {a: 1, b: null};
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = {a: 1, b: null};
				expect(result).toEqual(expected);
			});
		});
		
		describe('multiple mapping array', function () {
			var result;
			beforeEach(function () {
				var mapping = [{
					a: 'a',
					b: 'b'
				}];
				var data = [
					{a: 'value 1', b: 'value 2'},
					{a: 'value 3', b: 'value 4'},
					{a: 'value 5', b: 'value 6'}
				];
				result = NestHydrationJS.nest(data, mapping);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{a: 'value 1', b: 'value 2'},
					{a: 'value 3', b: 'value 4'},
					{a: 'value 5', b: 'value 6'}
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('multiple mapping array, hinted mapping', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_a: 'value 1', _b: 'value 2'},
					{_a: 'value 3', _b: 'value 4'},
					{_a: 'value 5', _b: 'value 6'}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{a: 'value 1', b: 'value 2'},
					{a: 'value 3', b: 'value 4'},
					{a: 'value 5', b: 'value 6'}
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to one', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: '1', _a_id: 'a1'},
					{_id: '2', _a_id: 'a2'},
					{_id: '3', _a_id: 'a3'}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{id: '1', a: {id: 'a1'}},
					{id: '2', a: {id: 'a2'}},
					{id: '3', a: {id: 'a3'}}
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to one, number type', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: '1', _a_id___NUMBER: '1'},
					{_id: '2', _a_id___NUMBER: '2'},
					{_id: '3', _a_id___NUMBER: '3'}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{id: '1', a: {id: 1}},
					{id: '2', a: {id: 2}},
					{id: '3', a: {id: 3}}
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to one, integer id', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: 1, _a_id: 1},
					{_id: 2, _a_id: 2},
					{_id: 3, _a_id: 3}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{id: 1, a: {id: 1}},
					{id: 2, a: {id: 2}},
					{id: 3, a: {id: 3}}
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to one, null', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: '1', _a_id: null}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{id: '1', a: null}
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to many', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: '1', _a__id: 'a1'},
					{_id: '1', _a__id: 'a2'},
					{_id: '2', _a__id: 'a3'}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{id: '1', a: [
						{id: 'a1'},
						{id: 'a2'}
					]},
					{id: '2', a: [
						{id: 'a3'}
					]},
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to many, integer id', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: 1, _a__id: 1},
					{_id: 1, _a__id: 2},
					{_id: 2, _a__id: 3}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{id: 1, a: [
						{id: 1},
						{id: 2}
					]},
					{id: 2, a: [
						{id: 3}
					]},
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to many, references previously used', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: '1', _a__id: 'a1'},
					{_id: '1', _a__id: 'a2'},
					{_id: '2', _a__id: 'a1'}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{id: '1', a: [
						{id: 'a1'},
						{id: 'a2'}
					]},
					{id: '2', a: [
						{id: 'a1'}
					]},
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to many, empty', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: '1', _a__id: null},
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{id: '1', a: []}
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('hinted mapping, to many, double up', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_col1: '1a', _col2: '2a', _col3: '3a', _sub__col1: 'sub 1a', _sub__col2: 'sub 2a', _sub__col3: 'sub 3a'},
					{_col1: '1a', _col2: '2a', _col3: '3a', _sub__col1: 'sub 1b', _sub__col2: 'sub 2b', _sub__col3: 'sub 3b'},
					{_col1: '1b', _col2: '2b', _col3: '3b', _sub__col1: 'sub 1a', _sub__col2: 'sub 2a', _sub__col3: 'sub 3a'},
					{_col1: '1b', _col2: '2b', _col3: '3b', _sub__col1: 'sub 1b', _sub__col2: 'sub 2b', _sub__col3: 'sub 3b'}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{col1: '1a', col2: '2a', col3: '3a', sub: [
						{col1: 'sub 1a', col2: 'sub 2a', col3: 'sub 3a'},
						{col1: 'sub 1b', col2: 'sub 2b', col3: 'sub 3b'}
					]},
					{col1: '1b', col2: '2b', col3: '3b', sub: [
						{col1: 'sub 1a', col2: 'sub 2a', col3: 'sub 3a'},
						{col1: 'sub 1b', col2: 'sub 2b', col3: 'sub 3b'},
					]},
				];
				expect(result).toEqual(expected);
			});
		});
		
		describe('complex', function () {
			var result;
			beforeEach(function () {
				var data = [
					{_id: '1', _a__id: null, _a__a: null, _a__b__id: null, _b_id: '1', _b_a: '1', _b_b__id: '1', _b_b__a: '1'},
					{_id: '1', _a__id: null, _a__a: null, _a__b__id: null, _b_id: '1', _b_a: '1', _b_b__id: '2', _b_b__a: null},
					{_id: '2', _a__id: '1',  _a__a: '1',  _a__b__id: null, _b_id: '1', _b_a: '1', _b_b__id: '1', _b_b__a: '1'},
					{_id: '2', _a__id: '2',  _a__a: '2',  _a__b__id: '1',  _b_id: '1', _b_a: '1', _b_b__id: '1', _b_b__a: '1'},
					{_id: '2', _a__id: '2',  _a__a: '2',  _a__b__id: '2',  _b_id: '1', _b_a: '1', _b_b__id: '1', _b_b__a: '1'},
					{_id: '2', _a__id: '2',  _a__a: '2',  _a__b__id: '2',  _b_id: '1', _b_a: '1', _b_b__id: '2', _b_b__a: null}
				];
				result = NestHydrationJS.nest(data);
			});
			
			it('should match expected structure', function () {
				var expected = [
					{
						id: '1',
						a: [],
						b: {
							id: '1',
							a: '1',
							b: [
								{
									id: '1',
									a: '1'
								},
								{
									id: '2',
									a: null
								}
							]
						}
					},
					{
						id: '2',
						a: [
							{
								id: '1',
								a: '1',
								b: []
							},
							{
								id: '2',
								a: '2',
								b: [
									{
										id: '1'
									},
									{
										id: '2'
									}
								]
							}
						],
						b: {
							id: '1',
							a: '1',
							b: [
								{
									id: '1',
									a: '1'
								},
								{
									id: '2',
									a: null
								}
							]
						}
					}
				];
				expect(result).toEqual(expected);
			});
		});
		describe('Documentation Example 1', function () {
			var result;
			beforeEach(function () {
				var table = [
					{id: '1', title: 'Tabular to Objects',            teacher_id: '1', teacher_name: 'David', lesson_id: '1', lesson_title: 'Defintions'     },
					{id: '1', title: 'Tabular to Objects',            teacher_id: '1', teacher_name: 'David', lesson_id: '2', lesson_title: 'Table Data'     },
					{id: '1', title: 'Tabular to Objects',            teacher_id: '1', teacher_name: 'David', lesson_id: '3', lesson_title: 'Objects'        },
					{id: '2', title: 'Column Names Define Structure', teacher_id: '2', teacher_name: 'Chris', lesson_id: '4', lesson_title: 'Column Names'   },
					{id: '2', title: 'Column Names Define Structure', teacher_id: '2', teacher_name: 'Chris', lesson_id: '2', lesson_title: 'Table Data'     },
					{id: '2', title: 'Column Names Define Structure', teacher_id: '2', teacher_name: 'Chris', lesson_id: '3', lesson_title: 'Objects'        },
					{id: '3', title: 'Object On Bottom',              teacher_id: '1', teacher_name: 'David', lesson_id: '5', lesson_title: 'Non Array Input'}
				];
				var definition = [{
					id: 'id',
					title: 'title',
					teacher: {
						id: 'teacher_id',
						name: 'teacher_name'
					},
					lesson: [{
						id: 'lesson_id',
						title: 'lesson_title'
					}]
				}];
				result = NestHydrationJS.nest(table, definition);
			});
			it('should match expected structure', function () {
				var expected = [
					{id: '1', title: 'Tabular to Objects', teacher: {id: '1', name: 'David'}, lesson: [
						{id: '1', title: 'Defintions'},
						{id: '2', title: 'Table Data'},
						{id: '3', title: 'Objects'}
					]},
					{id: '2', title: 'Column Names Define Structure', teacher: {id: '2', name: 'Chris'}, lesson: [
						{id: '4', title: 'Column Names'},
						{id: '2', title: 'Table Data'},
						{id: '3', title: 'Objects'}
					]},
					{id: '3', title: 'Object On Bottom', teacher: {id: '1', name: 'David'}, lesson: [
						{id: '5', title: 'Non Array Input'}
					]}
				];
				expect(result).toEqual(expected);
			});
		});
		describe('Flatish With reused structure and some not', function () {
			var result;
			beforeEach(function () {
				var table = [
					{_uniqueId: '403_10', _gradeComponent_id___NUMBER: 403, _gradeComponent_name: 'gradeComponent4', _gradeComponent_weight: 0.5, _gradeComponent_type: 'participation', _workspace_id___NUMBER: 200, _workspace_name: 'Learning More Every Day Workspace', _user_id___NUMBER: '10', _user_avatar_gravatar: '1f06a000a42796be652e66d6c078aae3', _user_firstname: 'Bob', _user_lastname: 'Brown', _grade_uniqueId: '403_10', _grade_given___NUMBER: '0.00000000000000000000', _grade_calculated___NUMBER: '0.00000000000000000000', _grade_manual___BOOLEAN: false, _grade_attendance_id___NUMBER: 8, _grade_attendance_presents___NUMBER: null, _grade_attendance_absents___NUMBER: null, _grade_attendance_total___NUMBER: null, _grade_participation_id___NUMBER: 8, _grade_participation_positive___NUMBER: 0, _grade_participation_negative___NUMBER: 1},
					{_uniqueId: '402_10', _gradeComponent_id___NUMBER: 402, _gradeComponent_name: 'gradeComponent3', _gradeComponent_weight: 0.2, _gradeComponent_type: 'participation', _workspace_id___NUMBER: 201, _workspace_name: 'Bluedrop learning', _user_id___NUMBER: '10', _user_avatar_gravatar: '1f06a000a42796be652e66d6c078aae3', _user_firstname: 'Bob', _user_lastname: 'Brown', _grade_uniqueId: '402_10', _grade_given___NUMBER: '0.50', _grade_calculated___NUMBER: null, _grade_manual___BOOLEAN: true, _grade_attendance_id___NUMBER: 7, _grade_attendance_presents___NUMBER: null, _grade_attendance_absents___NUMBER: null, _grade_attendance_total___NUMBER: null, _grade_participation_id___NUMBER: 7, _grade_participation_positive___NUMBER: null, _grade_participation_negative___NUMBER: null},
					{_uniqueId: '401_10', _gradeComponent_id___NUMBER: 401, _gradeComponent_name: 'gradeComponent2', _gradeComponent_weight: 0.2, _gradeComponent_type: 'assignments', _workspace_id___NUMBER: 201, _workspace_name: 'Bluedrop learning', _user_id___NUMBER: '10', _user_avatar_gravatar: '1f06a000a42796be652e66d6c078aae3', _user_firstname: 'Bob', _user_lastname: 'Brown', _grade_uniqueId: '401_10', _grade_given___NUMBER: '0.00', _grade_calculated___NUMBER: '0.70000000000000000000', _grade_manual___BOOLEAN: true, _grade_attendance_id___NUMBER: 5, _grade_attendance_presents___NUMBER: null, _grade_attendance_absents___NUMBER: null, _grade_attendance_total___NUMBER: null, _grade_participation_id___NUMBER: 5, _grade_participation_positive___NUMBER: null, _grade_participation_negative___NUMBER: null},
					{_uniqueId: '400_10', _gradeComponent_id___NUMBER: 400, _gradeComponent_name: 'gradeComponent1', _gradeComponent_weight: 0.5, _gradeComponent_type: 'assignments', _workspace_id___NUMBER: 200, _workspace_name: 'Learning More Every Day Workspace', _user_id___NUMBER: '10', _user_avatar_gravatar: '1f06a000a42796be652e66d6c078aae3', _user_firstname: 'Bob', _user_lastname: 'Brown', _grade_uniqueId: '400_10', _grade_given___NUMBER: '0.80', _grade_calculated___NUMBER: '0.70000000000000000000', _grade_manual___BOOLEAN: true, _grade_attendance_id___NUMBER: 1, _grade_attendance_presents___NUMBER: null, _grade_attendance_absents___NUMBER: null, _grade_attendance_total___NUMBER: null, _grade_participation_id___NUMBER: 1, _grade_participation_positive___NUMBER: 0, _grade_participation_negative___NUMBER: 1}
    			];
				result = NestHydrationJS.nest(table);
			});
			it('should match expected structure', function () {
				var expected = [
					{
						uniqueId: '403_10',
						gradeComponent: {
							id: 403,
							name: 'gradeComponent4',
							weight: 0.5,
							type: 'participation'
						},
						workspace: {
							id: 200,
							name: 'Learning More Every Day Workspace'
						},
						user: {
							id: 10,
							firstname: 'Bob',
							lastname: 'Brown',
							avatar: {
								gravatar: '1f06a000a42796be652e66d6c078aae3'
							}
						},
						grade: {
							uniqueId: '403_10',
							given: 0,
							calculated: 0,
							manual: false,
							attendance: {
								id: 8,
								presents: null,
								absents: null,
								total : null
							},
							participation: {
								id: 8,
								positive: 0,
								negative: 1
							}
						}
					},
					{
						uniqueId: '402_10',
						gradeComponent: {
							id: 402,
							name: 'gradeComponent3',
							weight: 0.2,
							type: 'participation'
						},
						workspace: {
							id: 201,
							name: 'Bluedrop learning'
						},
						user: {
							id: 10,
							firstname: 'Bob',
							lastname: 'Brown',
							avatar: {
								gravatar: '1f06a000a42796be652e66d6c078aae3'
							}
						},
						grade: {
							uniqueId: '402_10',
							given: 0.5,
							calculated: null,
							manual: true,
							attendance: {
								id: 7,
								presents: null,
								absents: null,
								total : null
							},
							participation: {
								id: 7,
								positive: null,
								negative: null
							}
						}
					},
					{
						uniqueId: '401_10',
						gradeComponent: {
							id: 401,
							name: 'gradeComponent2',
							weight: 0.2,
							type: 'assignments'
						},
						workspace: {
							id: 201,
							name: 'Bluedrop learning'
						},
						user: {
							id: 10,
							firstname: 'Bob',
							lastname: 'Brown',
							avatar:
							{
								gravatar: '1f06a000a42796be652e66d6c078aae3'
							}
						},
						grade: {
							uniqueId: '401_10',
							given: 0,
							calculated: 0.7,
							manual: true,
							attendance: {
								id: 5,
								presents: null,
								absents: null,
								total : null
							},
							participation: {
								id: 5,
								positive: null,
								negative: null
							}
						}
					},
					{
						uniqueId: '400_10',
						gradeComponent: {
							id: 400,
							name: 'gradeComponent1',
							weight: 0.5,
							type: 'assignments'
						},
						workspace: {
							id: 200,
							name: 'Learning More Every Day Workspace'
						},
						user: {
							id: 10,
							firstname: 'Bob',
							lastname: 'Brown',
							avatar: {
								gravatar: '1f06a000a42796be652e66d6c078aae3'
							}
						},
						grade: {
							uniqueId: '400_10',
							given: 0.8,
							calculated: 0.7,
							manual: true,
							attendance: {
								id: 1,
								presents: null,
								absents: null,
								total : null
							},
							participation: {
								id: 1,
								positive: 0,
								negative: 1
							}
						}
					}
				];
				expect(result).toEqual(expected);
			});
		});
	});
});
