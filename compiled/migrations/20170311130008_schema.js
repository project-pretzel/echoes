'use strict';

exports.up = function (knex, Promise) {
  return Promise.all([
  //users
  knex.schema.createTable('user', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
  }),

  //artists
  knex.schema.createTable('artist', function (table) {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
  }),

  //many albums to one artist
  knex.schema.createTable('album', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.integer('artist_id');
    table.string('genre').notNullable();
    table.integer('year').notNullable();
    table.string('art_url60').notNullable(); //saves album art 60px size square
    table.string('art_url100').notNullable(); //saves album art 100px size square
    table.foreign('artist_id').references('artist.id');
    table.unique(['title', 'artist_id']); //guarantees no repeated albums for an artist
  }),

  //many songs to one album
  knex.schema.createTable('song', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.integer('album_id');
    table.foreign('album_id').references('id').inTable('album');
    table.unique(['title', 'album_id']);
  }),

  //many users impressions to many albums
  knex.schema.createTable('album_impression', function (table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('album_id');
    table.integer('rating');
    table.string('impression');
    table.foreign('user_id').references('user.id');
    table.foreign('album_id').references('album.id');
    table.unique(['user_id', 'album_id']);
  }),

  //many listening dates to one album impression
  knex.schema.createTable('listen_date', function (table) {
    table.increments('id').primary();
    table.integer('album_impression_id');
    table.date('date').notNullable();
    table.foreign('album_impression_id').references('album_impression.id');
    table.unique(['album_impression_id', 'date']);
  })]);
};

exports.down = function (knex, Promise) {
  return Promise.all([knex.dropTable('user'), knex.dropTable('artist'), knex.dropTable('album'), knex.dropTable('song'), knex.dropTable('user_album'), knex.dropTable('listen_date')]);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21pZ3JhdGlvbnMvMjAxNzAzMTExMzAwMDhfc2NoZW1hLmpzIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJ1cCIsImtuZXgiLCJQcm9taXNlIiwiYWxsIiwic2NoZW1hIiwiY3JlYXRlVGFibGUiLCJ0YWJsZSIsImluY3JlbWVudHMiLCJwcmltYXJ5Iiwic3RyaW5nIiwidW5pcXVlIiwibm90TnVsbGFibGUiLCJpbnRlZ2VyIiwiZm9yZWlnbiIsInJlZmVyZW5jZXMiLCJpblRhYmxlIiwiZGF0ZSIsImRvd24iLCJkcm9wVGFibGUiXSwibWFwcGluZ3MiOiI7O0FBQ0FBLFFBQVFDLEVBQVIsR0FBYSxVQUFTQyxJQUFULEVBQWVDLE9BQWYsRUFBd0I7QUFDbkMsU0FBT0EsUUFBUUMsR0FBUixDQUFZO0FBQ2pCO0FBQ0FGLE9BQUtHLE1BQUwsQ0FBWUMsV0FBWixDQUF3QixNQUF4QixFQUFnQyxVQUFTQyxLQUFULEVBQWdCO0FBQzlDQSxVQUFNQyxVQUFOLENBQWlCLElBQWpCLEVBQXVCQyxPQUF2QjtBQUNBRixVQUFNRyxNQUFOLENBQWEsTUFBYjtBQUNBSCxVQUFNRyxNQUFOLENBQWEsVUFBYixFQUF5QkMsTUFBekIsR0FBa0NDLFdBQWxDO0FBQ0FMLFVBQU1HLE1BQU4sQ0FBYSxVQUFiLEVBQXlCRSxXQUF6QjtBQUNELEdBTEQsQ0FGaUI7O0FBU2pCO0FBQ0FWLE9BQUtHLE1BQUwsQ0FBWUMsV0FBWixDQUF3QixRQUF4QixFQUFrQyxVQUFTQyxLQUFULEVBQWdCO0FBQ2hEQSxVQUFNQyxVQUFOLENBQWlCLElBQWpCLEVBQXVCQyxPQUF2QjtBQUNBRixVQUFNRyxNQUFOLENBQWEsTUFBYixFQUFxQkMsTUFBckIsR0FBOEJDLFdBQTlCO0FBQ0QsR0FIRCxDQVZpQjs7QUFlakI7QUFDQVYsT0FBS0csTUFBTCxDQUFZQyxXQUFaLENBQXdCLE9BQXhCLEVBQWlDLFVBQVNDLEtBQVQsRUFBZ0I7QUFDL0NBLFVBQU1DLFVBQU4sQ0FBaUIsSUFBakIsRUFBdUJDLE9BQXZCO0FBQ0FGLFVBQU1HLE1BQU4sQ0FBYSxPQUFiLEVBQXNCRSxXQUF0QjtBQUNBTCxVQUFNTSxPQUFOLENBQWMsV0FBZDtBQUNBTixVQUFNRyxNQUFOLENBQWEsT0FBYixFQUFzQkUsV0FBdEI7QUFDQUwsVUFBTU0sT0FBTixDQUFjLE1BQWQsRUFBc0JELFdBQXRCO0FBQ0FMLFVBQU1HLE1BQU4sQ0FBYSxXQUFiLEVBQTBCRSxXQUExQixHQU4rQyxDQU1OO0FBQ3pDTCxVQUFNRyxNQUFOLENBQWEsWUFBYixFQUEyQkUsV0FBM0IsR0FQK0MsQ0FPTDtBQUMxQ0wsVUFBTU8sT0FBTixDQUFjLFdBQWQsRUFBMkJDLFVBQTNCLENBQXNDLFdBQXRDO0FBQ0FSLFVBQU1JLE1BQU4sQ0FBYSxDQUFDLE9BQUQsRUFBVSxXQUFWLENBQWIsRUFUK0MsQ0FTVDtBQUN2QyxHQVZELENBaEJpQjs7QUE0QmpCO0FBQ0FULE9BQUtHLE1BQUwsQ0FBWUMsV0FBWixDQUF3QixNQUF4QixFQUFnQyxVQUFTQyxLQUFULEVBQWdCO0FBQzlDQSxVQUFNQyxVQUFOLENBQWlCLElBQWpCLEVBQXVCQyxPQUF2QjtBQUNBRixVQUFNRyxNQUFOLENBQWEsT0FBYjtBQUNBSCxVQUFNTSxPQUFOLENBQWMsVUFBZDtBQUNBTixVQUFNTyxPQUFOLENBQWMsVUFBZCxFQUEwQkMsVUFBMUIsQ0FBcUMsSUFBckMsRUFBMkNDLE9BQTNDLENBQW1ELE9BQW5EO0FBQ0FULFVBQU1JLE1BQU4sQ0FBYSxDQUFDLE9BQUQsRUFBVSxVQUFWLENBQWI7QUFDRCxHQU5ELENBN0JpQjs7QUFxQ2pCO0FBQ0FULE9BQUtHLE1BQUwsQ0FBWUMsV0FBWixDQUF3QixrQkFBeEIsRUFBNEMsVUFBU0MsS0FBVCxFQUFnQjtBQUMxREEsVUFBTUMsVUFBTixDQUFpQixJQUFqQixFQUF1QkMsT0FBdkI7QUFDQUYsVUFBTU0sT0FBTixDQUFjLFNBQWQ7QUFDQU4sVUFBTU0sT0FBTixDQUFjLFVBQWQ7QUFDQU4sVUFBTU0sT0FBTixDQUFjLFFBQWQ7QUFDQU4sVUFBTUcsTUFBTixDQUFhLFlBQWI7QUFDQUgsVUFBTU8sT0FBTixDQUFjLFNBQWQsRUFBeUJDLFVBQXpCLENBQW9DLFNBQXBDO0FBQ0FSLFVBQU1PLE9BQU4sQ0FBYyxVQUFkLEVBQTBCQyxVQUExQixDQUFxQyxVQUFyQztBQUNBUixVQUFNSSxNQUFOLENBQWEsQ0FBQyxTQUFELEVBQVksVUFBWixDQUFiO0FBQ0QsR0FURCxDQXRDaUI7O0FBaURqQjtBQUNBVCxPQUFLRyxNQUFMLENBQVlDLFdBQVosQ0FBd0IsYUFBeEIsRUFBdUMsVUFBU0MsS0FBVCxFQUFnQjtBQUNyREEsVUFBTUMsVUFBTixDQUFpQixJQUFqQixFQUF1QkMsT0FBdkI7QUFDQUYsVUFBTU0sT0FBTixDQUFjLHFCQUFkO0FBQ0FOLFVBQU1VLElBQU4sQ0FBVyxNQUFYLEVBQW1CTCxXQUFuQjtBQUNBTCxVQUFNTyxPQUFOLENBQWMscUJBQWQsRUFBcUNDLFVBQXJDLENBQWdELHFCQUFoRDtBQUNBUixVQUFNSSxNQUFOLENBQWEsQ0FBQyxxQkFBRCxFQUF3QixNQUF4QixDQUFiO0FBQ0QsR0FORCxDQWxEaUIsQ0FBWixDQUFQO0FBMERELENBM0REOztBQTZEQVgsUUFBUWtCLElBQVIsR0FBZSxVQUFTaEIsSUFBVCxFQUFlQyxPQUFmLEVBQXdCO0FBQ3JDLFNBQU9BLFFBQVFDLEdBQVIsQ0FBWSxDQUNqQkYsS0FBS2lCLFNBQUwsQ0FBZSxNQUFmLENBRGlCLEVBRWpCakIsS0FBS2lCLFNBQUwsQ0FBZSxRQUFmLENBRmlCLEVBR2pCakIsS0FBS2lCLFNBQUwsQ0FBZSxPQUFmLENBSGlCLEVBSWpCakIsS0FBS2lCLFNBQUwsQ0FBZSxNQUFmLENBSmlCLEVBS2pCakIsS0FBS2lCLFNBQUwsQ0FBZSxZQUFmLENBTGlCLEVBTWpCakIsS0FBS2lCLFNBQUwsQ0FBZSxhQUFmLENBTmlCLENBQVosQ0FBUDtBQVFELENBVEQiLCJmaWxlIjoiMjAxNzAzMTExMzAwMDhfc2NoZW1hLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnRzLnVwID0gZnVuY3Rpb24oa25leCwgUHJvbWlzZSkge1xuICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgIC8vdXNlcnNcbiAgICBrbmV4LnNjaGVtYS5jcmVhdGVUYWJsZSgndXNlcicsIGZ1bmN0aW9uKHRhYmxlKSB7XG4gICAgICB0YWJsZS5pbmNyZW1lbnRzKCdpZCcpLnByaW1hcnkoKTtcbiAgICAgIHRhYmxlLnN0cmluZygnbmFtZScpO1xuICAgICAgdGFibGUuc3RyaW5nKCd1c2VybmFtZScpLnVuaXF1ZSgpLm5vdE51bGxhYmxlKCk7XG4gICAgICB0YWJsZS5zdHJpbmcoJ3Bhc3N3b3JkJykubm90TnVsbGFibGUoKTtcbiAgICB9KSxcblxuICAgIC8vYXJ0aXN0c1xuICAgIGtuZXguc2NoZW1hLmNyZWF0ZVRhYmxlKCdhcnRpc3QnLCBmdW5jdGlvbih0YWJsZSkge1xuICAgICAgdGFibGUuaW5jcmVtZW50cygnaWQnKS5wcmltYXJ5KCk7XG4gICAgICB0YWJsZS5zdHJpbmcoJ25hbWUnKS51bmlxdWUoKS5ub3ROdWxsYWJsZSgpO1xuICAgIH0pLFxuXG4gICAgLy9tYW55IGFsYnVtcyB0byBvbmUgYXJ0aXN0XG4gICAga25leC5zY2hlbWEuY3JlYXRlVGFibGUoJ2FsYnVtJywgZnVuY3Rpb24odGFibGUpIHtcbiAgICAgIHRhYmxlLmluY3JlbWVudHMoJ2lkJykucHJpbWFyeSgpO1xuICAgICAgdGFibGUuc3RyaW5nKCd0aXRsZScpLm5vdE51bGxhYmxlKCk7XG4gICAgICB0YWJsZS5pbnRlZ2VyKCdhcnRpc3RfaWQnKTtcbiAgICAgIHRhYmxlLnN0cmluZygnZ2VucmUnKS5ub3ROdWxsYWJsZSgpO1xuICAgICAgdGFibGUuaW50ZWdlcigneWVhcicpLm5vdE51bGxhYmxlKCk7XG4gICAgICB0YWJsZS5zdHJpbmcoJ2FydF91cmw2MCcpLm5vdE51bGxhYmxlKCk7IC8vc2F2ZXMgYWxidW0gYXJ0IDYwcHggc2l6ZSBzcXVhcmVcbiAgICAgIHRhYmxlLnN0cmluZygnYXJ0X3VybDEwMCcpLm5vdE51bGxhYmxlKCk7IC8vc2F2ZXMgYWxidW0gYXJ0IDEwMHB4IHNpemUgc3F1YXJlXG4gICAgICB0YWJsZS5mb3JlaWduKCdhcnRpc3RfaWQnKS5yZWZlcmVuY2VzKCdhcnRpc3QuaWQnKTtcbiAgICAgIHRhYmxlLnVuaXF1ZShbJ3RpdGxlJywgJ2FydGlzdF9pZCddKTsgLy9ndWFyYW50ZWVzIG5vIHJlcGVhdGVkIGFsYnVtcyBmb3IgYW4gYXJ0aXN0XG4gICAgfSksXG5cbiAgICAvL21hbnkgc29uZ3MgdG8gb25lIGFsYnVtXG4gICAga25leC5zY2hlbWEuY3JlYXRlVGFibGUoJ3NvbmcnLCBmdW5jdGlvbih0YWJsZSkge1xuICAgICAgdGFibGUuaW5jcmVtZW50cygnaWQnKS5wcmltYXJ5KCk7XG4gICAgICB0YWJsZS5zdHJpbmcoJ3RpdGxlJyk7XG4gICAgICB0YWJsZS5pbnRlZ2VyKCdhbGJ1bV9pZCcpO1xuICAgICAgdGFibGUuZm9yZWlnbignYWxidW1faWQnKS5yZWZlcmVuY2VzKCdpZCcpLmluVGFibGUoJ2FsYnVtJyk7XG4gICAgICB0YWJsZS51bmlxdWUoWyd0aXRsZScsICdhbGJ1bV9pZCddKTtcbiAgICB9KSxcblxuICAgIC8vbWFueSB1c2VycyBpbXByZXNzaW9ucyB0byBtYW55IGFsYnVtc1xuICAgIGtuZXguc2NoZW1hLmNyZWF0ZVRhYmxlKCdhbGJ1bV9pbXByZXNzaW9uJywgZnVuY3Rpb24odGFibGUpIHtcbiAgICAgIHRhYmxlLmluY3JlbWVudHMoJ2lkJykucHJpbWFyeSgpO1xuICAgICAgdGFibGUuaW50ZWdlcigndXNlcl9pZCcpO1xuICAgICAgdGFibGUuaW50ZWdlcignYWxidW1faWQnKTtcbiAgICAgIHRhYmxlLmludGVnZXIoJ3JhdGluZycpO1xuICAgICAgdGFibGUuc3RyaW5nKCdpbXByZXNzaW9uJyk7XG4gICAgICB0YWJsZS5mb3JlaWduKCd1c2VyX2lkJykucmVmZXJlbmNlcygndXNlci5pZCcpO1xuICAgICAgdGFibGUuZm9yZWlnbignYWxidW1faWQnKS5yZWZlcmVuY2VzKCdhbGJ1bS5pZCcpO1xuICAgICAgdGFibGUudW5pcXVlKFsndXNlcl9pZCcsICdhbGJ1bV9pZCddKTtcbiAgICB9KSxcblxuICAgIC8vbWFueSBsaXN0ZW5pbmcgZGF0ZXMgdG8gb25lIGFsYnVtIGltcHJlc3Npb25cbiAgICBrbmV4LnNjaGVtYS5jcmVhdGVUYWJsZSgnbGlzdGVuX2RhdGUnLCBmdW5jdGlvbih0YWJsZSkge1xuICAgICAgdGFibGUuaW5jcmVtZW50cygnaWQnKS5wcmltYXJ5KCk7XG4gICAgICB0YWJsZS5pbnRlZ2VyKCdhbGJ1bV9pbXByZXNzaW9uX2lkJyk7XG4gICAgICB0YWJsZS5kYXRlKCdkYXRlJykubm90TnVsbGFibGUoKTtcbiAgICAgIHRhYmxlLmZvcmVpZ24oJ2FsYnVtX2ltcHJlc3Npb25faWQnKS5yZWZlcmVuY2VzKCdhbGJ1bV9pbXByZXNzaW9uLmlkJyk7XG4gICAgICB0YWJsZS51bmlxdWUoWydhbGJ1bV9pbXByZXNzaW9uX2lkJywgJ2RhdGUnXSk7XG4gICAgfSlcbiAgXSk7XG59O1xuXG5leHBvcnRzLmRvd24gPSBmdW5jdGlvbihrbmV4LCBQcm9taXNlKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAga25leC5kcm9wVGFibGUoJ3VzZXInKSxcbiAgICBrbmV4LmRyb3BUYWJsZSgnYXJ0aXN0JyksXG4gICAga25leC5kcm9wVGFibGUoJ2FsYnVtJyksXG4gICAga25leC5kcm9wVGFibGUoJ3NvbmcnKSxcbiAgICBrbmV4LmRyb3BUYWJsZSgndXNlcl9hbGJ1bScpLFxuICAgIGtuZXguZHJvcFRhYmxlKCdsaXN0ZW5fZGF0ZScpXG4gIF0pO1xufTtcbiJdfQ==